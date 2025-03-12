import type { Listing } from "@/types/listing"

/**
 * Gets the main image URL from a listing, following a priority order:
 * 1. First property image
 * 2. First apartment image
 * 3. First room image
 * 4. Fallback placeholder
 *
 * @param listing - The listing object containing image arrays
 * @param fallbackImage - Optional custom fallback image path
 * @returns The URL of the selected image
 */
export function getMainImage(
  listing: Listing,
  fallbackImage = "/placeholder-image.svg"
): string {
  if (listing.propertyImages && listing.propertyImages.length > 0) {
    return listing.propertyImages[0].url
  }

  if (listing.apartmentImages && listing.apartmentImages.length > 0) {
    return listing.apartmentImages[0].url
  }

  if (listing.roomImages && listing.roomImages.length > 0) {
    return listing.roomImages[0].url
  }

  return fallbackImage
}
