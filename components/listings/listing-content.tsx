"use client"

import { useRouter, useSearchParams } from "next/navigation"

import type { Listing } from "@/types/listing"
import { useListingsQuery } from "@/hooks/queries/use-listings-query"
import { EmptyState } from "@/components/listings/empty-state"
import { ErrorState } from "@/components/listings/error-state"
import { ListingCard } from "@/components/listings/listing-card"
import { ListingCardSkeleton } from "@/components/listings/listing-card-skeleton"
import { ListingsPagination } from "@/components/listings/pagination"

interface PaginationData {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface ListingsGridProps {
  listings: Listing[]
}

interface PaginationSectionProps {
  pagination: PaginationData
  onPageChange: (page: number) => void
}

interface ListingsContentProps {
  listings: Listing[]
  pagination: PaginationData
  isLoading: boolean
  isError: boolean
  error: Error | null
  onPageChange: (page: number) => void
}

// Helper function to create pagination params
const createPaginationParams = (
  searchParams: URLSearchParams,
  page: number
): string => {
  const params = new URLSearchParams(searchParams)
  params.set("page", page.toString())
  return params.toString()
}

// Component for displaying the grid of listings
const ListingsGrid = ({ listings }: ListingsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {listings.map((listing, index) => (
      <ListingCard key={listing.referenceId} listing={listing} index={index} />
    ))}
  </div>
)

// Component for pagination section
const PaginationSection = ({
  pagination,
  onPageChange,
}: PaginationSectionProps) => {
  if (pagination.totalPages <= 1) return null

  return (
    <ListingsPagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      hasNextPage={pagination.hasNextPage}
      hasPrevPage={pagination.hasPrevPage}
      onPageChange={onPageChange}
    />
  )
}

// Component for the main content area with conditional rendering
const ListingsContentComponent = ({
  listings,
  pagination,
  isLoading,
  isError,
  error,
  onPageChange,
}: ListingsContentProps) => {
  // Show loading state
  if (isLoading) {
    return <ListingCardSkeleton />
  }

  // Show error state
  if (isError) {
    return (
      <ErrorState
        message={
          error?.message || "Error loading listings. Please try again later."
        }
      />
    )
  }

  // Show empty state
  if (listings.length === 0) {
    return <EmptyState />
  }

  // Show listings and pagination
  return (
    <>
      <ListingsGrid listings={listings} />
      <PaginationSection pagination={pagination} onPageChange={onPageChange} />
    </>
  )
}

export function ListingsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  // Fetch listings data
  const { data, isLoading, isError, error } = useListingsQuery(queryString)

  // Extract listings and pagination data with defaults
  const listings = data?.data || []
  const pagination = data?.metadata.pagination || {
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    const newQueryString = createPaginationParams(searchParams, page)
    router.push(`/listings?${newQueryString}`)
  }

  return (
    <ListingsContentComponent
      listings={listings}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      error={error as Error | null}
      onPageChange={handlePageChange}
    />
  )
}
