"use client"

import { useQuery } from "@tanstack/react-query"

import type { APIResponse } from "@/types/listing"

/**
 * Fetches listings data based on the provided query string
 */
async function fetchListings(queryString: string): Promise<APIResponse> {
  const response = await fetch(
    `/api/listings${queryString ? `?${queryString}` : ""}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch listings")
  }

  return response.json()
}

/**
 * Custom hook for fetching listings with TanStack Query
 *
 * @param queryString - URL query parameters as a string
 * @returns Query result containing listings data, loading state, and error state
 */
export function useListingsQuery(queryString: string) {
  return useQuery({
    queryKey: ["listings", queryString],
    queryFn: () => fetchListings(queryString),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
