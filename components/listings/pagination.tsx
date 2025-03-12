"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ListingsPaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onPageChange: (page: number) => void
}

export function ListingsPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: ListingsPaginationProps) {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }

    // For larger number of pages, show current page, one before and after (if available),
    // and first and last pages with ellipsis
    const pageNumbers = [0] // Always include first page

    // Add ellipsis if needed
    if (currentPage > 2) {
      pageNumbers.push(-1) // -1 represents ellipsis
    }

    // Add page before current if not first page
    if (currentPage > 1) {
      pageNumbers.push(currentPage - 1)
    }

    // Add current page if not first or last
    if (currentPage > 0 && currentPage < totalPages - 1) {
      pageNumbers.push(currentPage)
    }

    // Add page after current if not last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push(currentPage + 1)
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 3) {
      pageNumbers.push(-2) // -2 represents second ellipsis
    }

    // Add last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1)
    }

    return pageNumbers
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (hasPrevPage) {
                onPageChange(currentPage - 1)
              }
            }}
            aria-disabled={!hasPrevPage}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageNumbers().map((pageIndex, i) =>
          pageIndex < 0 ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageIndex}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageIndex}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(pageIndex)
                }}
              >
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (hasNextPage) {
                onPageChange(currentPage + 1)
              }
            }}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
