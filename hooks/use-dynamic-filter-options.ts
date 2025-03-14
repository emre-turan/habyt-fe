"use client"

import { useMemo } from "react"

import type { Listing } from "@/types/listing"
import { formatShareType, type ShareType } from "@/lib/share-types"

/**
 * Interface representing the available filter options derived from listings data
 */
interface DynamicFilterOptions {
  /** Unique city names available in the listings */
  cities: string[]
  /** Available property types with formatted labels */
  shareTypes: { value: string; label: string }[]
  /** Minimum and maximum rent values in the listings */
  rentRange: { min: number; max: number }
  /** Minimum and maximum bedroom counts in the listings */
  bedroomsRange: { min: number; max: number }
  /** Total number of listings available */
  availableCount: number
}

/**
 * Default options when no listings data is available
 */
const DEFAULT_OPTIONS: DynamicFilterOptions = {
  cities: [],
  shareTypes: [],
  rentRange: { min: 0, max: 5000 },
  bedroomsRange: { min: 0, max: 10 },
  availableCount: 0,
}

/**
 * Extracts unique cities from the listings data.
 *
 * @param listings - Array of listing objects to analyze
 * @returns Array of unique cities
 */
const extractCities = (listings: Listing[]): string[] => {
  return Array.from(
    new Set(
      listings
        .map((item) => item.city)
        .filter(
          (city): city is string =>
            typeof city === "string" && city.trim() !== ""
        )
    )
  ).sort()
}

/**
 * Extracts unique share types from the listings data.
 *
 * @param listings - Array of listing objects to analyze
 * @returns Array of unique share types with formatted labels
 */
const extractShareTypes = (
  listings: Listing[]
): { value: string; label: string }[] => {
  const uniqueShareTypes = Array.from(
    new Set(
      listings
        .map((item) => item.shareType)
        .filter(
          (type): type is ShareType =>
            typeof type === "string" && type.trim() !== ""
        )
    )
  )

  return uniqueShareTypes.map((type) => ({
    value: type,
    label: formatShareType(type),
  }))
}

/**
 * Extracts the minimum and maximum rent values from the listings data.
 *
 * @param listings - Array of listing objects to analyze
 * @returns Object containing the minimum and maximum rent values
 */
const extractRentRange = (
  listings: Listing[]
): { min: number; max: number } => {
  const validRents = listings
    .map((item) => item.rentNet)
    .filter(
      (rent): rent is number =>
        typeof rent === "number" && !isNaN(rent) && isFinite(rent)
    )

  return validRents.length > 0
    ? {
        min: Math.floor(Math.min(...validRents)),
        max: Math.ceil(Math.max(...validRents)),
      }
    : DEFAULT_OPTIONS.rentRange
}

/**
 * Extracts the minimum and maximum bedroom counts from the listings data.
 *
 * @param listings - Array of listing objects to analyze
 * @returns Object containing the minimum and maximum bedroom counts
 */
const extractBedroomsRange = (
  listings: Listing[]
): { min: number; max: number } => {
  const validBedrooms = listings
    .map((item) => item.apartmentBedroomCount)
    .filter(
      (count): count is number =>
        typeof count === "number" &&
        !isNaN(count) &&
        isFinite(count) &&
        count >= 0
    )

  return validBedrooms.length > 0
    ? {
        min: Math.min(...validBedrooms),
        max: Math.max(...validBedrooms),
      }
    : DEFAULT_OPTIONS.bedroomsRange
}

/**
 * Hook to analyze available filter options based on current listings data.
 * Extracts unique values and ranges from listings to provide dynamic filter options.
 *
 * @param listings - Array of listing objects to analyze
 * @returns Object containing dynamic filter options derived from the listings
 *
 * @example
 * ```tsx
 * const { data } = useListingsQuery(queryString)
 * const options = useDynamicFilterOptions(data?.data || [])
 *
 * // Use options to populate filter UI
 * console.log(`Available cities: ${options.cities.length}`)
 * ```
 */
export function useDynamicFilterOptions(
  listings: Listing[]
): DynamicFilterOptions {
  // Use memoization to avoid unnecessary recalculations
  return useMemo(() => {
    // Handle empty listings case
    if (!listings || listings.length === 0) {
      return DEFAULT_OPTIONS
    }

    try {
      // Process options using helper functions
      return {
        cities: extractCities(listings),
        shareTypes: extractShareTypes(listings),
        rentRange: extractRentRange(listings),
        bedroomsRange: extractBedroomsRange(listings),
        availableCount: listings.length,
      }
    } catch (error) {
      console.error("Error processing filter options:", error)
      return DEFAULT_OPTIONS
    }
  }, [listings])
}
