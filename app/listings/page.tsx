import { Suspense } from "react"
import { Metadata } from "next"

import { FilterBar } from "@/components/filters/filter-bar"
import { FilterBarSkeleton } from "@/components/filters/filter-bar-skeleton"
import { ListingCardSkeleton } from "@/components/listings/listing-card-skeleton"
import { ListingsContent } from "@/components/listings/listing-content"

export const metadata: Metadata = {
  title: "Listings | Find Your Perfect Home",
  description:
    "Browse our curated selection of available properties and find your ideal living space.",
}

export default function ListingsPage() {
  return (
    <>
      <Suspense fallback={<FilterBarSkeleton />}>
        <FilterBar />
      </Suspense>

      <Suspense fallback={<ListingCardSkeleton />}>
        <ListingsContent />
      </Suspense>
    </>
  )
}
