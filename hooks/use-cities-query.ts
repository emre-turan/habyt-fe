"use client"

import { useQuery } from "@tanstack/react-query"

import type { Listing } from "@/types/listing"

/**
 * Fetches all listings and extracts unique cities
 */
async function fetchCities(): Promise<string[]> {
  const response = await fetch("/api/listings")

  if (!response.ok) {
    throw new Error("Failed to fetch cities")
  }

  const data = await response.json()

  // Extract unique cities and sort them
  const uniqueCities = Array.from(
    new Set(data.data.map((listing: Listing) => listing.city))
  ).sort() as string[]

  return uniqueCities
}

/**
 * Custom hook for fetching unique cities with TanStack Query
 *
 * @returns Query result containing cities data, loading state, and error state
 */
export function useCitiesQuery() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
