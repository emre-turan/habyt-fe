"use client"

import { useMemo } from "react"

import { getShareTypeOptions } from "@/lib/share-types"

/**
 * A simple hook that determines whether to use all share types or dynamic ones
 * based on whether other filters are active.
 */
export function useFilterShareTypes(
  filters: {
    city: string
    rentFrom: string
    rentTo: string
    selectedShareTypes: string[]
    date?: Date
    bedroomsFrom: string
    bedroomsTo: string
  },
  dynamicShareTypes: Array<{ value: string; label: string }>
) {
  // Get all possible share types
  const allShareTypes = getShareTypeOptions()

  // Check if any filters other than share types are active
  const hasOtherActiveFilters = useMemo(() => {
    return (
      (filters.city && filters.city !== "all") ||
      !!filters.rentFrom ||
      !!filters.rentTo ||
      !!filters.bedroomsFrom ||
      !!filters.bedroomsTo ||
      !!filters.date
    )
  }, [
    filters.city,
    filters.rentFrom,
    filters.rentTo,
    filters.bedroomsFrom,
    filters.bedroomsTo,
    filters.date,
  ])

  // If no other filters are active, use all share types
  // Otherwise, ensure selected types are included in the options
  return useMemo(() => {
    if (!hasOtherActiveFilters) {
      return allShareTypes
    }

    // Make sure selected options are included
    const availableValues = dynamicShareTypes.map((opt) => opt.value)
    const additionalOptions = filters.selectedShareTypes
      .filter((value) => !availableValues.includes(value))
      .map((value) => {
        const option = allShareTypes.find((opt) => opt.value === value)
        return option || { value, label: value }
      })

    return [...dynamicShareTypes, ...additionalOptions]
  }, [
    dynamicShareTypes,
    filters.selectedShareTypes,
    allShareTypes,
    hasOtherActiveFilters,
  ])
}
