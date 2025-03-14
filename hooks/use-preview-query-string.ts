"use client"

import { useCallback } from "react"

/**
 * Interface representing the filter state
 * This matches the filters object returned from useListingsFilters
 */
interface FilterState {
  city: string
  rentFrom: string
  rentTo: string
  selectedShareTypes: string[]
  date?: Date
  bookableOn: string
  bedroomsFrom: string
  bedroomsTo: string
  calendarOpen: boolean
}

/**
 * Hook to generate a preview query string based on current filter state
 * This is used for fetching data for dynamic filter options without applying filters to the URL
 *
 * @param filters - Current filter state
 * @returns A query string for preview data fetching
 */
export function usePreviewQueryString(filters: FilterState) {
  return useCallback(() => {
    const params = new URLSearchParams()

    if (filters.city && filters.city !== "all") {
      params.append("city", filters.city)
    }

    if (filters.selectedShareTypes.length > 0) {
      filters.selectedShareTypes.forEach((type) => {
        params.append("shareType", type)
      })
    }

    if (filters.rentFrom) {
      params.append("rentFrom", filters.rentFrom.toString())
    }

    if (filters.rentTo) {
      params.append("rentTo", filters.rentTo.toString())
    }

    if (filters.bedroomsFrom) {
      params.append("bedroomsFrom", filters.bedroomsFrom.toString())
    }

    if (filters.bedroomsTo) {
      params.append("bedroomsTo", filters.bedroomsTo.toString())
    }

    if (filters.date) {
      params.append("bookableOn", filters.date.toISOString().split("T")[0])
    }

    // Add a large pageSize to get all available options
    params.append("pageSize", "1000")

    return params.toString()
  }, [
    filters.city,
    filters.selectedShareTypes,
    filters.rentFrom,
    filters.rentTo,
    filters.bedroomsFrom,
    filters.bedroomsTo,
    filters.date,
  ])
}
