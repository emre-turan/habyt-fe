"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { APIResponse, Listing } from "@/types/listing"
import { FilterBar } from "@/components/filters/filter-bar"
import { ListingCard } from "@/components/listings/listing-card"

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
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="p-4 text-red-500 bg-red-100 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && listings.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No listings found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to find more results.
          </p>
        </div>
      )}

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
            <div className="flex justify-center my-6">
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`px-4 py-2 rounded-md ${
                    pagination.hasPrevPage
                      ? "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 rounded-md ${
                      pagination.currentPage === i
                        ? "bg-blue-600 text-white border border-blue-600"
                        : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-4 py-2 rounded-md ${
                    pagination.hasNextPage
                      ? "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
