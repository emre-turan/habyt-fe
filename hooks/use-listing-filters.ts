"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { format } from "date-fns"

/**
 * Custom hook for managing listing filter state.
 *
 * This hook centralizes all filter-related state and logic, ensuring consistent
 * behavior across components while maintaining the existing functionality.
 *
 * Features:
 * - Initializes filter state from URL parameters
 * - Synchronizes date state with bookableOn parameter
 * - Provides methods to update filters and apply them to the URL
 * - Handles resetting all filters
 *
 * @returns An object containing filter state, setters, and actions
 *
 * @example
 * ```tsx
 * const {
 *   filters,
 *   setters,
 *   actions
 * } = useListingsFilters();
 *
 * // Access filter values
 * const { city, rentFrom, selectedShareTypes } = filters;
 *
 * // Update filter values
 * setters.setCity("Berlin");
 *
 * // Apply or reset filters
 * actions.applyFilters();
 * actions.resetFilters();
 * ```
 */
export function useListingsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL parameters
  const [city, setCity] = useState<string>(searchParams.get("city") || "")
  const [rentFrom, setRentFrom] = useState<string>(
    searchParams.get("rentFrom") || ""
  )
  const [rentTo, setRentTo] = useState<string>(searchParams.get("rentTo") || "")
  const [selectedShareTypes, setSelectedShareTypes] = useState<string[]>(() => {
    const params = searchParams.getAll("shareType")
    return params.length > 0 ? params : []
  })
  const [bookableOn, setBookableOn] = useState<string>(
    searchParams.get("bookableOn") || ""
  )
  const [date, setDate] = useState<Date | undefined>(
    bookableOn ? new Date(bookableOn) : undefined
  )
  const [calendarOpen, setCalendarOpen] = useState(false)

  const [bedroomsFrom, setBedroomsFrom] = useState<string>(
    searchParams.get("bedroomsFrom") || ""
  )
  const [bedroomsTo, setBedroomsTo] = useState<string>(
    searchParams.get("bedroomsTo") || ""
  )

  // Update bookableOn when date changes
  useEffect(() => {
    if (date) {
      setBookableOn(format(date, "yyyy-MM-dd"))
    } else {
      setBookableOn("")
    }
  }, [date])

  /**
   * Updates the date state and closes the calendar popover.
   * Maintains the exact same behavior as the original implementation.
   *
   * @param newDate - The selected date or undefined if cleared
   */
  const handleSelectDate = (newDate: Date | undefined) => {
    setDate(newDate)
    setCalendarOpen(false)
  }

  /**
   * Applies the current filter state to the URL.
   * This triggers a re-fetch of listings with the applied filters.
   */
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (city && city !== "all") params.append("city", city)
    if (rentFrom) params.append("rentFrom", rentFrom)
    if (rentTo) params.append("rentTo", rentTo)
    if (bookableOn) params.append("bookableOn", bookableOn)
    if (bedroomsFrom) params.append("bedroomsFrom", bedroomsFrom)
    if (bedroomsTo) params.append("bedroomsTo", bedroomsTo)

    // Add all selected share types
    selectedShareTypes.forEach((type) => {
      params.append("shareType", type)
    })

    router.push(`/listings?${params.toString()}`)
  }

  /**
   * Resets all filters to their default values and updates the URL.
   */
  const resetFilters = () => {
    setCity("")
    setRentFrom("")
    setRentTo("")
    setSelectedShareTypes([])
    setBookableOn("")
    setBedroomsFrom("")
    setBedroomsTo("")
    setDate(undefined)
    router.push("/listings")
  }

  return {
    filters: {
      city,
      rentFrom,
      rentTo,
      selectedShareTypes,
      bookableOn,
      date,
      calendarOpen,
      bedroomsFrom,
      bedroomsTo,
    },
    setters: {
      setCity,
      setRentFrom,
      setRentTo,
      setSelectedShareTypes,
      setBookableOn,
      setDate,
      setCalendarOpen,
      setBedroomsFrom,
      setBedroomsTo,
    },
    actions: {
      handleSelectDate,
      applyFilters,
      resetFilters,
    },
  }
}
