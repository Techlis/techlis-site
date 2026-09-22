/**
 * Development Utilities
 * Helper functions for development and debugging
 */

import { getConfigurationStatus, isAppConfigured } from "@/lib/init"
import {
  getEnvironment,
  getEnvironmentConfig,
  getRSS2JSONConfig,
  getBlogConfig,
} from "@/lib/config"

/**
 * Log environment configuration details (development only)
 */
export function logEnvironmentInfo(): void {
  if (getEnvironment() !== "development") {
    return
  }

  const status = getConfigurationStatus()
  const envConfig = getEnvironmentConfig()
  const rss2jsonConfig = getRSS2JSONConfig()
  const blogConfig = getBlogConfig()

  console.group("🔧 Environment Configuration")

  console.log("📊 Status:", {
    isValid: status.isValid,
    environment: status.environment,
    hasApiKey: status.hasApiKey,
    errors: status.errors,
  })

  console.log("⚙️ Environment Config:", {
    isDevelopment: envConfig.isDevelopment,
    isProduction: envConfig.isProduction,
    isTest: envConfig.isTest,
    apiTimeout: envConfig.apiTimeout,
    cacheEnabled: envConfig.cacheEnabled,
    logLevel: envConfig.logLevel,
  })

  console.log("🌐 RSS2JSON Config:", {
    baseUrl: rss2jsonConfig.baseUrl,
    hasApiKey: !!rss2jsonConfig.apiKey,
    maxCount: rss2jsonConfig.maxCount,
    timeout: rss2jsonConfig.timeout,
    retryAttempts: rss2jsonConfig.retryAttempts,
    retryDelay: rss2jsonConfig.retryDelay,
  })

  console.log("📝 Blog Config:", {
    cacheEnabled: blogConfig.cacheEnabled,
    cacheDuration: blogConfig.cacheDuration,
    storageKey: blogConfig.storageKey,
    postsPerPage: blogConfig.postsPerPage,
    categories: Object.keys(blogConfig.categories),
  })

  console.groupEnd()
}

/**
 * Test API configuration (development only)
 */
export async function testAPIConfiguration(): Promise<{
  success: boolean
  message: string
  details?: unknown
}> {
  if (getEnvironment() !== "development") {
    return {
      success: false,
      message: "API testing is only available in development mode",
    }
  }

  if (!isAppConfigured()) {
    return {
      success: false,
      message: "Application is not properly configured",
      details: getConfigurationStatus(),
    }
  }

  try {
    const rss2jsonConfig = getRSS2JSONConfig()

    if (!rss2jsonConfig.apiKey) {
      return {
        success: false,
        message: "RSS2JSON API key is not configured",
      }
    }

    // Test with a simple RSS feed
    const testFeedUrl = "https://feeds.feedburner.com/oreilly/radar"
    const params = new URLSearchParams({
      rss_url: testFeedUrl,
      api_key: rss2jsonConfig.apiKey,
      count: "1",
    })

    const response = await fetch(`${rss2jsonConfig.baseUrl}?${params}`, {
      signal: AbortSignal.timeout(rss2jsonConfig.timeout),
    })

    if (!response.ok) {
      return {
        success: false,
        message: `API test failed: ${response.status} ${response.statusText}`,
        details: {
          status: response.status,
          statusText: response.statusText,
        },
      }
    }

    const data = await response.json()

    if (data.status !== "ok") {
      return {
        success: false,
        message: `RSS2JSON API error: ${data.status}`,
        details: data,
      }
    }

    return {
      success: true,
      message: "API configuration test successful",
      details: {
        feedTitle: data.feed?.title,
        itemCount: data.items?.length || 0,
      },
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return {
      success: false,
      message: `API test failed: ${errorMessage}`,
      details: { error: errorMessage },
    }
  }
}

/**
 * Clear all cached data (development only)
 */
export function clearAllCaches(): void {
  if (getEnvironment() !== "development") {
    console.warn("Cache clearing is only available in development mode")
    return
  }

  try {
    const blogConfig = getBlogConfig()
    localStorage.removeItem(blogConfig.storageKey)
    console.log("✅ All caches cleared successfully")
  } catch (error) {
    console.error("❌ Failed to clear caches:", error)
  }
}

/**
 * Export configuration for debugging
 */
export function exportConfiguration(): string {
  const config = {
    environment: getEnvironment(),
    status: getConfigurationStatus(),
    envConfig: getEnvironmentConfig(),
    rss2jsonConfig: {
      ...getRSS2JSONConfig(),
      apiKey: getRSS2JSONConfig().apiKey ? "[REDACTED]" : null,
    },
    blogConfig: getBlogConfig(),
    timestamp: new Date().toISOString(),
  }

  return JSON.stringify(config, null, 2)
}

// Extend the Window interface to include devUtils
declare global {
  interface Window {
    devUtils: {
      logEnvironmentInfo: typeof logEnvironmentInfo
      testAPIConfiguration: typeof testAPIConfiguration
      clearAllCaches: typeof clearAllCaches
      exportConfiguration: typeof exportConfiguration
      getConfigurationStatus: typeof getConfigurationStatus
    }
  }
}

// Make utilities available globally in development
if (getEnvironment() === "development") {
  window.devUtils = {
    logEnvironmentInfo,
    testAPIConfiguration,
    clearAllCaches,
    exportConfiguration,
    getConfigurationStatus,
  }

  console.log("🛠️ Development utilities available at window.devUtils")
}
