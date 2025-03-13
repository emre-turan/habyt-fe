"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { useListingsQuery } from "@/hooks/queries/use-listings-query"
import { Container } from "@/components/ui/container"
import { FilterBar } from "@/components/filters/filter-bar"
import { EmptyState } from "@/components/listings/empty-state"
import { ErrorState } from "@/components/listings/error-state"
import { ListingCard } from "@/components/listings/listing-card"
import { LoadingState } from "@/components/listings/loading-state"
import { ListingsPagination } from "@/components/listings/pagination"

export default function Listings() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const { data, isLoading, isError, error } = useListingsQuery(queryString)

  // Extract listings and pagination data
  const listings = data?.data || []
  const pagination = data?.metadata.pagination || {
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  }

  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object from the current one
    const params = new URLSearchParams(searchParams)
    // Update or add the page parameter
    params.set("page", page.toString())

    // Use the router to update the URL
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <Container className="py-4">
      {/* Filter section */}
      <FilterBar />
      {/* Loading state */}
      {isLoading && <LoadingState />}
      {/* Error state */}
      {isError && !isLoading && (
        <ErrorState
          message={
            error?.message || "Error loading listings. Please try again later."
          }
        />
      )}

      {/* Empty state */}
      {!isLoading && !isError && listings.length === 0 && <EmptyState />}
      {/* Listings grid */}
      {!isLoading && !isError && listings.length > 0 && (
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
    </Container>
  )
}
