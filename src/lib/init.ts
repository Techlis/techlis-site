/**
 * Application Initialization
 * Handles environment validation and setup
 */

import { validateEnvironmentConfig, logger, getEnvironment } from "@/lib/config"

/**
 * Initialize the application with environment validation
 */
export function initializeApp(): void {
  try {
    // Validate environment configuration
    validateEnvironmentConfig()

    const environment = getEnvironment()
    logger.info(`Application initialized in ${environment} mode`)

    // Log important configuration (without sensitive data)
    if (environment === "development") {
      logger.debug("Development mode features enabled:", {
        detailedLogging: true,
        cacheEnabled: true,
        retryAttempts: 1,
      })
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown initialization error"
    logger.error("Failed to initialize application:", errorMessage)

    // In production, we might want to show a user-friendly error
    if (getEnvironment() === "production") {
      throw new Error(
        "Application configuration error. Please contact support."
      )
    }

    // In development, show the actual error
    throw error
  }
}

/**
 * Check if the application is properly configured
 */
export function isAppConfigured(): boolean {
  try {
    validateEnvironmentConfig()
    return true
  } catch {
    return false
  }
}

/**
 * Get configuration status for debugging
 */
export function getConfigurationStatus(): {
  isValid: boolean
  environment: string
  hasApiKey: boolean
  errors: string[]
} {
  const errors: string[] = []
  let isValid = true
  let hasApiKey = false

  try {
    validateEnvironmentConfig()

    // Check if API key is available (without exposing it)
    const apiKey = import.meta.env.VITE_RSS2JSON_API_KEY
    hasApiKey = !!apiKey && apiKey.length > 0
  } catch (error) {
    isValid = false
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    errors.push(errorMessage)
  }

  return {
    isValid,
    environment: getEnvironment(),
    hasApiKey,
    errors,
  }
}
