/**
 * Enhanced Caching Service
 * Provides advanced caching strategies with performance monitoring
 */

import { performanceMonitor } from "@/lib/performance"
import { logger } from "@/lib/config"

export interface CacheEntry<T = any> {
  data: T
  timestamp: number
  expiresAt: number
  accessCount: number
  lastAccessed: number
  size: number
  tags: string[]
}

export interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum cache size in bytes
  maxEntries?: number // Maximum number of entries
  tags?: string[] // Tags for cache invalidation
  compress?: boolean // Enable compression for large data
}

export interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  totalSize: number
  entryCount: number
  oldestEntry: number
  newestEntry: number
}

/**
 * Advanced caching service with LRU eviction and performance monitoring
 */
export class CacheService {
  private cache = new Map<string, CacheEntry>()
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRate: 0,
    totalSize: 0,
    entryCount: 0,
    oldestEntry: 0,
    newestEntry: 0,
  }

  private readonly maxSize: number
  private readonly maxEntries: number
  private readonly defaultTTL: number

  constructor(
    maxSize: number = 10 * 1024 * 1024, // 10MB default
    maxEntries: number = 1000,
    defaultTTL: number = 60 * 60 * 1000 // 1 hour default
  ) {
    this.maxSize = maxSize
    this.maxEntries = maxEntries
    this.defaultTTL = defaultTTL

    // Cleanup expired entries periodically
    setInterval(() => this.cleanup(), 5 * 60 * 1000) // Every 5 minutes
  }

  /**
   * Get item from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      this.stats.misses++
      this.updateHitRate()
      performanceMonitor.recordCacheMiss(0)
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      this.stats.misses++
      this.updateHitRate()
      performanceMonitor.recordCacheMiss(0)
      return null
    }

    // Update access statistics
    entry.accessCount++
    entry.lastAccessed = Date.now()

    this.stats.hits++
    this.updateHitRate()
    performanceMonitor.recordCacheHit(0)

    logger.debug(`Cache hit for key: ${key}`)
    return entry.data
  }

  /**
   * Set item in cache
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const now = Date.now()
    const ttl = options.ttl || this.defaultTTL
    const size = this.calculateSize(data)
    const tags = options.tags || []

    // Check if we need to make space
    this.ensureSpace(size)

    const entry: CacheEntry<T> = {
      data: options.compress ? this.compress(data) : data,
      timestamp: now,
      expiresAt: now + ttl,
      accessCount: 0,
      lastAccessed: now,
      size,
      tags,
    }

    // Remove existing entry if it exists
    if (this.cache.has(key)) {
      const oldEntry = this.cache.get(key)!
      this.stats.totalSize -= oldEntry.size
    }

    this.cache.set(key, entry)
    this.stats.totalSize += size
    this.stats.entryCount = this.cache.size
    this.updateStats()

    logger.debug(
      `Cache set for key: ${key}, size: ${size} bytes, TTL: ${ttl}ms`
    )
  }

  /**
   * Delete item from cache
   */
  delete(key: string): boolean {
    const entry = this.cache.get(key)
    if (entry) {
      this.cache.delete(key)
      this.stats.totalSize -= entry.size
      this.stats.entryCount = this.cache.size
      this.updateStats()
      logger.debug(`Cache deleted for key: ${key}`)
      return true
    }
    return false
  }

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
    this.stats = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalSize: 0,
      entryCount: 0,
      oldestEntry: 0,
      newestEntry: 0,
    }
    logger.debug("Cache cleared")
  }

  /**
   * Invalidate cache entries by tags
   */
  invalidateByTags(tags: string[]): number {
    let invalidated = 0
    const toDelete: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags.some((tag) => tags.includes(tag))) {
        toDelete.push(key)
      }
    }

    toDelete.forEach((key) => {
      if (this.delete(key)) {
        invalidated++
      }
    })

    logger.debug(
      `Invalidated ${invalidated} cache entries by tags: ${tags.join(", ")}`
    )
    return invalidated
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats }
  }

  /**
   * Get cache entries for debugging
   */
  getEntries(): Array<{ key: string; entry: CacheEntry }> {
    return Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      entry: {
        ...entry,
        data: "[DATA]", // Don't expose actual data
      } as CacheEntry,
    }))
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now()
    const toDelete: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        toDelete.push(key)
      }
    }

    toDelete.forEach((key) => this.delete(key))

    if (toDelete.length > 0) {
      logger.debug(`Cleaned up ${toDelete.length} expired cache entries`)
    }
  }

  /**
   * Ensure there's enough space for new entry
   */
  private ensureSpace(newEntrySize: number): void {
    // Check size limit
    while (
      this.stats.totalSize + newEntrySize > this.maxSize &&
      this.cache.size > 0
    ) {
      this.evictLRU()
    }

    // Check entry count limit
    while (this.cache.size >= this.maxEntries) {
      this.evictLRU()
    }
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null
    let oldestTime = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.delete(oldestKey)
      logger.debug(`Evicted LRU cache entry: ${oldestKey}`)
    }
  }

  /**
   * Calculate approximate size of data
   */
  private calculateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size
    } catch {
      // Fallback estimation
      return JSON.stringify(data).length * 2 // Rough estimate for UTF-16
    }
  }

  /**
   * Compress data (simple JSON compression)
   */
  private compress<T>(data: T): T {
    // In a real implementation, you might use a compression library
    // For now, we'll just return the data as-is
    return data
  }

  /**
   * Update hit rate calculation
   */
  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0
  }

  /**
   * Update cache statistics
   */
  private updateStats(): void {
    const now = Date.now()
    let oldest = now
    let newest = 0

    for (const entry of this.cache.values()) {
      if (entry.timestamp < oldest) oldest = entry.timestamp
      if (entry.timestamp > newest) newest = entry.timestamp
    }

    this.stats.oldestEntry = oldest
    this.stats.newestEntry = newest
  }
}

/**
 * Memory-based cache service instance
 */
export const memoryCache = new CacheService()

/**
 * Persistent cache service using localStorage
 */
export class PersistentCacheService extends CacheService {
  private readonly storageKey: string

  constructor(
    storageKey: string = "app_cache",
    maxSize: number = 5 * 1024 * 1024, // 5MB for localStorage
    maxEntries: number = 500,
    defaultTTL: number = 24 * 60 * 60 * 1000 // 24 hours
  ) {
    super(maxSize, maxEntries, defaultTTL)
    this.storageKey = storageKey
    this.loadFromStorage()
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const data = JSON.parse(stored)
        // Restore cache entries
        for (const [key, entry] of Object.entries(data.entries || {})) {
          if (Date.now() <= (entry as CacheEntry).expiresAt) {
            this.cache.set(key, entry as CacheEntry)
          }
        }
        // Restore stats
        if (data.stats) {
          this.stats = { ...this.stats, ...data.stats }
        }
        logger.debug(`Loaded ${this.cache.size} cache entries from storage`)
      }
    } catch (error) {
      logger.warn("Failed to load cache from storage:", error)
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToStorage(): void {
    try {
      const data = {
        entries: Object.fromEntries(this.cache.entries()),
        stats: this.stats,
        timestamp: Date.now(),
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      logger.warn("Failed to save cache to storage:", error)
    }
  }

  /**
   * Override set to persist changes
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    super.set(key, data, options)
    this.saveToStorage()
  }

  /**
   * Override delete to persist changes
   */
  delete(key: string): boolean {
    const result = super.delete(key)
    if (result) {
      this.saveToStorage()
    }
    return result
  }

  /**
   * Override clear to persist changes
   */
  clear(): void {
    super.clear()
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      logger.warn("Failed to clear cache from storage:", error)
    }
  }
}

/**
 * Persistent cache service instance
 */
export const persistentCache = new PersistentCacheService("techlis_cache")
