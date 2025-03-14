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

    const paramMapping = [
      {
        key: "city",
        value: filters.city,
        condition: filters.city && filters.city !== "all",
      },
      {
        key: "rentFrom",
        value: filters.rentFrom,
        condition: !!filters.rentFrom,
      },
      { key: "rentTo", value: filters.rentTo, condition: !!filters.rentTo },
      {
        key: "bedroomsFrom",
        value: filters.bedroomsFrom,
        condition: !!filters.bedroomsFrom,
      },
      {
        key: "bedroomsTo",
        value: filters.bedroomsTo,
        condition: !!filters.bedroomsTo,
      },
      {
        key: "bookableOn",
        value: filters.date?.toISOString().split("T")[0],
        condition: !!filters.date,
      },
    ]

    // Add simple parameters
    paramMapping.forEach(({ key, value, condition }) => {
      if (condition && value) {
        params.append(key, value.toString())
      }
    })

    // Handle array parameters separately
    if (filters.selectedShareTypes.length > 0) {
      filters.selectedShareTypes.forEach((type) => {
        params.append("shareType", type)
      })
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
