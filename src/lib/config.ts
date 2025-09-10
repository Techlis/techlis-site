/**
 * Environment Configuration
 * Handles development vs production environment settings
 */

export type Environment = "development" | "production" | "test"

export interface EnvironmentConfig {
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  apiTimeout: number
  cacheEnabled: boolean
  logLevel: "debug" | "info" | "warn" | "error"
}

/**
 * Get current environment
 */
export function getEnvironment(): Environment {
  const env =
    import.meta.env.VITE_APP_ENV || import.meta.env.MODE || "development"

  if (env === "production") return "production"
  if (env === "test") return "test"
  return "development"
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const env = getEnvironment()

  return {
    isDevelopment: env === "development",
    isProduction: env === "production",
    isTest: env === "test",
    apiTimeout: env === "production" ? 10000 : 5000, // Longer timeout in production
    cacheEnabled: env !== "test", // Disable cache in tests
    logLevel: env === "production" ? "error" : "debug",
  }
}

/**
 * RSS2JSON API Configuration
 */
export interface RSS2JSONConfig {
  baseUrl: string
  apiKey: string
  maxCount: number
  timeout: number
  retryAttempts: number
  retryDelay: number
}

/**
 * Get RSS2JSON API configuration with environment-specific settings
 */
export function getRSS2JSONConfig(): RSS2JSONConfig {
  const envConfig = getEnvironmentConfig()

  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_RSS2JSON_API_KEY || ""

  if (!apiKey && envConfig.isProduction) {
    throw new Error("RSS2JSON API key is required in production environment")
  }

  return {
    baseUrl:
      import.meta.env.VITE_RSS2JSON_BASE_URL ||
      "https://api.rss2json.com/v1/api.json",
    apiKey,
    maxCount: parseInt(import.meta.env.VITE_RSS2JSON_MAX_COUNT || "10", 10),
    timeout: parseInt(
      import.meta.env.VITE_RSS2JSON_TIMEOUT || envConfig.apiTimeout.toString(),
      10
    ),
    retryAttempts: envConfig.isProduction ? 3 : 1,
    retryDelay: envConfig.isProduction ? 1000 : 500,
  }
}

/**
 * Blog Configuration
 */
export interface BlogConfig {
  cacheEnabled: boolean
  cacheDuration: number
  storageKey: string
  postsPerPage: number
  threeWeeksMs: number
  fiveMonthsMs: number
  categories: Record<string, string>
}

/**
 * Get blog configuration with environment-specific settings
 */
export function getBlogConfig(): BlogConfig {
  const envConfig = getEnvironmentConfig()

  return {
    cacheEnabled: envConfig.cacheEnabled,
    cacheDuration: envConfig.isProduction ? 60 * 60 * 1000 : 30 * 60 * 1000, // 1 hour in prod, 30 min in dev
    storageKey: "techlis_blog_data",
    postsPerPage: parseInt(import.meta.env.VITE_BLOG_POSTS_PER_PAGE || "6", 10),
    threeWeeksMs: 21 * 24 * 60 * 60 * 1000,
    fiveMonthsMs: 5 * 30 * 24 * 60 * 60 * 1000,
    categories: {
      "ai-ml": "AI & Machine Learning",
      "software-dev": "Software Development",
      "web-mobile": "Web & Mobile",
      "cloud-devops": "Cloud & DevOps",
    },
  }
}

/**
 * Logging utility that respects environment log level
 */
export const logger = {
  debug: (...args: unknown[]) => {
    const config = getEnvironmentConfig()
    if (config.logLevel === "debug") {
      console.debug("[DEBUG]", ...args)
    }
  },

  info: (...args: unknown[]) => {
    const config = getEnvironmentConfig()
    if (["debug", "info"].includes(config.logLevel)) {
      console.info("[INFO]", ...args)
    }
  },

  warn: (...args: unknown[]) => {
    const config = getEnvironmentConfig()
    if (["debug", "info", "warn"].includes(config.logLevel)) {
      console.warn("[WARN]", ...args)
    }
  },

  error: (...args: unknown[]) => {
    console.error("[ERROR]", ...args)
  },
}

/**
 * Validate environment configuration
 */
export function validateEnvironmentConfig(): void {
  const envConfig = getEnvironmentConfig()
  const rss2jsonConfig = getRSS2JSONConfig()

  if (envConfig.isProduction) {
    if (!rss2jsonConfig.apiKey) {
      throw new Error("RSS2JSON API key is required in production")
    }

    if (!import.meta.env.VITE_SITE_URL) {
      throw new Error("Site URL is required in production")
    }
  }

  // Validate API configuration
  if (rss2jsonConfig.maxCount < 1 || rss2jsonConfig.maxCount > 100) {
    throw new Error("RSS2JSON max count must be between 1 and 100")
  }

  if (rss2jsonConfig.timeout < 1000 || rss2jsonConfig.timeout > 30000) {
    throw new Error("RSS2JSON timeout must be between 1000ms and 30000ms")
  }

  logger.info("Environment configuration validated successfully", {
    environment: getEnvironment(),
    hasApiKey: !!rss2jsonConfig.apiKey,
    cacheEnabled: envConfig.cacheEnabled,
  })
}
