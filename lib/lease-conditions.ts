import type { Listing } from "@/types/listing"

/**
 * Formats the minimum stay information from a listing in a human-readable format.
 * Handles cases where lease conditions or minimum stay information might be missing.
 *
 * @param listing - The listing object containing lease conditions
 * @param fallbackText - Text to display when minimum stay information is not available
 * @returns Formatted minimum stay text
 */
export function formatMinimumStay(
  listing: Listing,
  fallbackText = "Not specified"
): string {
  if (!listing.leaseConditions || !listing.leaseConditions.minimumStay) {
    return fallbackText
  }

  const { amount, unit } = listing.leaseConditions.minimumStay
  return `${amount} ${unit}`
}
