#!/usr/bin/env node

/**
 * Build Optimization Script
 * Analyzes and optimizes the production build
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join, extname } from "path"
import { gzipSync } from "zlib"

const DIST_DIR = "dist"
const MAX_CHUNK_SIZE = 200 * 1024 // 200KB
const MAX_CSS_SIZE = 50 * 1024 // 50KB

/**
 * Analyze bundle sizes
 */
function analyzeBundleSizes() {
  console.log("🔍 Analyzing bundle sizes...\n")

  const results = {
    js: [],
    css: [],
    assets: [],
    total: 0,
    gzippedTotal: 0,
  }

  function analyzeDirectory(dir, prefix = "") {
    const items = readdirSync(dir)

    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        analyzeDirectory(fullPath, `${prefix}${item}/`)
      } else {
        const size = stat.size
        const ext = extname(item)
        const relativePath = `${prefix}${item}`

        // Calculate gzipped size for text files
        let gzippedSize = size
        if ([".js", ".css", ".html", ".json"].includes(ext)) {
          try {
            const content = readFileSync(fullPath)
            gzippedSize = gzipSync(content).length
          } catch (error) {
            console.warn(`Failed to gzip ${relativePath}:`, error.message)
          }
        }

        const fileInfo = {
          path: relativePath,
          size,
          gzippedSize,
          sizeKB: (size / 1024).toFixed(2),
          gzippedKB: (gzippedSize / 1024).toFixed(2),
        }

        if (ext === ".js") {
          results.js.push(fileInfo)
        } else if (ext === ".css") {
          results.css.push(fileInfo)
        } else {
          results.assets.push(fileInfo)
        }

        results.total += size
        results.gzippedTotal += gzippedSize
      }
    }
  }

  analyzeDirectory(DIST_DIR)

  // Sort by size (largest first)
  results.js.sort((a, b) => b.size - a.size)
  results.css.sort((a, b) => b.size - a.size)
  results.assets.sort((a, b) => b.size - a.size)

  return results
}

/**
 * Display bundle analysis results
 */
function displayResults(results) {
  console.log("📊 Bundle Analysis Results\n")

  // JavaScript files
  if (results.js.length > 0) {
    console.log("🟨 JavaScript Files:")
    results.js.forEach((file) => {
      const warning = file.size > MAX_CHUNK_SIZE ? " ⚠️  Large chunk!" : ""
      console.log(
        `  ${file.path}: ${file.sizeKB}KB (${file.gzippedKB}KB gzipped)${warning}`
      )
    })
    console.log()
  }

  // CSS files
  if (results.css.length > 0) {
    console.log("🟦 CSS Files:")
    results.css.forEach((file) => {
      const warning = file.size > MAX_CSS_SIZE ? " ⚠️  Large CSS!" : ""
      console.log(
        `  ${file.path}: ${file.sizeKB}KB (${file.gzippedKB}KB gzipped)${warning}`
      )
    })
    console.log()
  }

  // Assets
  if (results.assets.length > 0) {
    console.log("🟩 Assets:")
    const largeAssets = results.assets.filter((file) => file.size > 100 * 1024)
    if (largeAssets.length > 0) {
      largeAssets.forEach((file) => {
        console.log(`  ${file.path}: ${file.sizeKB}KB`)
      })
    } else {
      console.log(`  ${results.assets.length} assets (all under 100KB)`)
    }
    console.log()
  }

  // Totals
  console.log("📈 Total Bundle Size:")
  console.log(`  Raw: ${(results.total / 1024).toFixed(2)}KB`)
  console.log(`  Gzipped: ${(results.gzippedTotal / 1024).toFixed(2)}KB`)
  console.log()
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(results) {
  const recommendations = []

  // Check for large JavaScript chunks
  const largeJSFiles = results.js.filter((file) => file.size > MAX_CHUNK_SIZE)
  if (largeJSFiles.length > 0) {
    recommendations.push({
      type: "warning",
      message: `${largeJSFiles.length} JavaScript chunk(s) exceed ${MAX_CHUNK_SIZE / 1024}KB`,
      suggestion:
        "Consider code splitting or lazy loading for large components",
    })
  }

  // Check for large CSS files
  const largeCSSFiles = results.css.filter((file) => file.size > MAX_CSS_SIZE)
  if (largeCSSFiles.length > 0) {
    recommendations.push({
      type: "warning",
      message: `${largeCSSFiles.length} CSS file(s) exceed ${MAX_CSS_SIZE / 1024}KB`,
      suggestion: "Consider CSS code splitting or removing unused styles",
    })
  }

  // Check total bundle size
  const totalGzippedMB = results.gzippedTotal / (1024 * 1024)
  if (totalGzippedMB > 1) {
    recommendations.push({
      type: "error",
      message: `Total gzipped bundle size (${totalGzippedMB.toFixed(2)}MB) exceeds 1MB`,
      suggestion: "Implement aggressive code splitting and lazy loading",
    })
  } else if (totalGzippedMB > 0.5) {
    recommendations.push({
      type: "warning",
      message: `Total gzipped bundle size (${totalGzippedMB.toFixed(2)}MB) is approaching 1MB`,
      suggestion: "Monitor bundle size and consider optimization strategies",
    })
  }

  // Check for duplicate dependencies
  const jsFiles = results.js.map((f) => f.path)
  const vendorFiles = jsFiles.filter((f) => f.includes("vendor"))
  if (vendorFiles.length > 1) {
    recommendations.push({
      type: "info",
      message: `Multiple vendor chunks detected (${vendorFiles.length})`,
      suggestion:
        "Review manual chunk configuration to avoid duplicate dependencies",
    })
  }

  // Performance recommendations
  if (results.js.length > 10) {
    recommendations.push({
      type: "info",
      message: `Many JavaScript chunks (${results.js.length}) detected`,
      suggestion:
        "Consider consolidating smaller chunks to reduce HTTP requests",
    })
  }

  return recommendations
}

/**
 * Display recommendations
 */
function displayRecommendations(recommendations) {
  if (recommendations.length === 0) {
    console.log("✅ No optimization recommendations - bundle looks good!")
    return
  }

  console.log("💡 Optimization Recommendations:\n")

  recommendations.forEach((rec, index) => {
    const icon =
      rec.type === "error" ? "❌" : rec.type === "warning" ? "⚠️" : "ℹ️"
    console.log(`${icon} ${rec.message}`)
    console.log(`   → ${rec.suggestion}\n`)
  })
}

/**
 * Generate performance report
 */
function generateReport(results, recommendations) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles:
        results.js.length + results.css.length + results.assets.length,
      totalSizeKB: (results.total / 1024).toFixed(2),
      totalGzippedKB: (results.gzippedTotal / 1024).toFixed(2),
      compressionRatio: (
        (1 - results.gzippedTotal / results.total) *
        100
      ).toFixed(1),
    },
    files: {
      javascript: results.js,
      css: results.css,
      assets: results.assets.slice(0, 10), // Top 10 assets only
    },
    recommendations,
    performance: {
      grade:
        recommendations.filter((r) => r.type === "error").length > 0
          ? "F"
          : recommendations.filter((r) => r.type === "warning").length > 2
            ? "D"
            : recommendations.filter((r) => r.type === "warning").length > 0
              ? "C"
              : "A",
      score: Math.max(
        0,
        100 -
          recommendations.filter((r) => r.type === "error").length * 30 -
          recommendations.filter((r) => r.type === "warning").length * 10
      ),
    },
  }

  // Save report
  try {
    writeFileSync("bundle-analysis.json", JSON.stringify(report, null, 2))
    console.log("📄 Detailed report saved to bundle-analysis.json")
  } catch (error) {
    console.warn("Failed to save report:", error.message)
  }

  return report
}

/**
 * Main execution
 */
function main() {
  console.log("🚀 Starting bundle optimization analysis...\n")

  try {
    // Check if dist directory exists
    try {
      statSync(DIST_DIR)
    } catch (error) {
      console.error(
        `❌ Build directory '${DIST_DIR}' not found. Run 'pnpm build' first.`
      )
      process.exit(1)
    }

    // Analyze bundle
    const results = analyzeBundleSizes()

    // Display results
    displayResults(results)

    // Generate recommendations
    const recommendations = generateRecommendations(results)
    displayRecommendations(recommendations)

    // Generate report
    const report = generateReport(results, recommendations)

    // Final summary
    console.log(
      `🎯 Performance Grade: ${report.performance.grade} (${report.performance.score}/100)`
    )
    console.log(`📦 Compression Ratio: ${report.summary.compressionRatio}%`)

    // Exit with appropriate code
    const hasErrors = recommendations.some((r) => r.type === "error")
    process.exit(hasErrors ? 1 : 0)
  } catch (error) {
    console.error("❌ Analysis failed:", error.message)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { analyzeBundleSizes, generateRecommendations, generateReport }
