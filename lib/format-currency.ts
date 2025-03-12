// Cache for Intl.NumberFormat instances to avoid recreating them
const formatterCache = new Map<string, Intl.NumberFormat>()

/**
 * Format a number as currency with the specified currency code.
 *
 * @param amount - The number to format
 * @param currency - The ISO 4217 currency code (defaults to "EUR" if empty)
 * @returns Formatted currency string
 *
 * @description
 * This utility uses a module-level cache for Intl.NumberFormat instances to improve performance:
 *
 * 1. Performance Benefits:
 *    - Creating Intl.NumberFormat instances is expensive (loads locale data)
 *    - Without caching, we'd create new instances on every render
 *    - For pages with many listings (10-20), this could mean 20-60 instances
 *
 * 2. Memory Efficiency:
 *    - The cache reduces memory allocation by reusing formatter objects
 *    - Only creates new formatters when encountering a new currency
 *
 * 3. Application-wide Cache:
 *    - Unlike useMemo (component-level), this cache persists across all components
 *    - Survives component unmounts and re-renders
 *
 * 4. When to Use This Pattern:
 *    - For expensive object creation (formatters, parsers, regex)
 *    - When the same operation is performed frequently
 *    - When the configuration options are limited (finite set of currencies)
 *
 * This approach is an industry standard pattern for optimizing expensive
 * formatter operations in production applications.
 */
export function formatCurrency(amount: number, currency = "EUR"): string {
  // Use EUR as fallback if currency is empty
  const currencyCode = currency || "EUR"

  // Create a cache key based on the currency and formatting options
  const cacheKey = `${currencyCode}-0` // 0 represents maximumFractionDigits

  // Check if we already have a formatter for this configuration
  if (!formatterCache.has(cacheKey)) {
    // Create and cache the formatter
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 0,
      })
    )
  }

  // Use the cached formatter
  return formatterCache.get(cacheKey)!.format(amount)
}
