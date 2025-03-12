"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { APIResponse, Listing } from "@/types/listing"
import { FilterBar } from "@/components/filters/filter-bar"
import { EmptyState } from "@/components/listings/empty-state"
import { ErrorState } from "@/components/listings/error-state"
import { ListingCard } from "@/components/listings/listing-card"
import { LoadingState } from "@/components/listings/loading-state"
import { ListingsPagination } from "@/components/listings/pagination"

export default function Listings() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      try {
        // Create URL with search parameters
        const queryString = searchParams.toString()
        const response = await fetch(
          `/api/listings${queryString ? `?${queryString}` : ""}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch listings")
        }

        const data: APIResponse = await response.json()
        setListings(data.data)
        setPagination({
          currentPage: data.metadata.pagination.currentPage,
          totalPages: data.metadata.pagination.totalPages,
          hasNextPage: data.metadata.pagination.hasNextPage,
          hasPrevPage: data.metadata.pagination.hasPrevPage,
        })
      } catch (err) {
        setError("Error loading listings. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [searchParams])

  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object from the current one
    const params = new URLSearchParams(searchParams)
    // Update or add the page parameter
    params.set("page", page.toString())

    // Update the URL without reloading the page
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    )

    // Manually trigger a new fetch since we're not using Next.js router to navigate
    const event = new Event("popstate")
    window.dispatchEvent(event)
  }

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Listings</h1>
      {/* Filter section */}
      <FilterBar />
      {/* Loading state */}
      {loading && <LoadingState />}
      {/* Error state */}
      {error && !loading && <ErrorState message={error} />}

      {/* Empty state */}
      {!loading && !error && listings.length === 0 && <EmptyState />}
      {/* Listings grid */}
      {!loading && !error && listings.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {listings.map((listing) => (
              <ListingCard key={listing.referenceId} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <ListingsPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  )
}
