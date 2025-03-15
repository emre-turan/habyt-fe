"use client"

import { useListingsQuery } from "@/hooks/queries/use-listings-query"
import { useDynamicFilterOptions } from "@/hooks/use-dynamic-filter-options"
import { useFilterShareTypes } from "@/hooks/use-filter-share-types"
import { useListingsFilters } from "@/hooks/use-listing-filters"
import { usePreviewQueryString } from "@/hooks/use-preview-query-string"
import { OptionSelectFilter } from "@/components/filters/option-select-filter"

import { BedroomFilter } from "./bedroom-range-filter"
import { CityFilter } from "./city-filter"
import { FilterActionButtons } from "./filter-action-buttons"
import { MoveInDateFilter } from "./move-in-date-filter"
import { PriceRangeFilter } from "./price-range-filter"

export function FilterBarContent() {
  const { filters, setters, actions } = useListingsFilters()

  // Get preview query string from the dedicated hook
  const getPreviewQueryString = usePreviewQueryString(filters)
  const previewQueryString = getPreviewQueryString()

  // Get preview data for dynamic filter options
  const { data: previewData } = useListingsQuery(previewQueryString)
  const previewListings = previewData?.data || []

  // Use preview listings for dynamic filter options
  const dynamicOptions = useDynamicFilterOptions(previewListings)

  const shareTypes = useFilterShareTypes(filters, dynamicOptions.shareTypes)

  const {
    city,
    rentFrom,
    rentTo,
    selectedShareTypes,
    date,
    bedroomsFrom,
    bedroomsTo,
  } = filters
  const {
    setCity,
    setRentFrom,
    setRentTo,
    setSelectedShareTypes,
    setBedroomsFrom,
    setBedroomsTo,
  } = setters
  const { handleSelectDate, applyFilters, resetFilters } = actions

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0
    if (city && city !== "all") count++
    if (selectedShareTypes.length > 0) count++
    if (rentFrom) count++
    if (rentTo) count++
    if (bedroomsFrom) count++
    if (bedroomsTo) count++
    if (date) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {/* City filter */}
        <CityFilter value={city} onChange={setCity} />

        {/* Property type filter */}
        <OptionSelectFilter
          options={shareTypes}
          selectedValues={selectedShareTypes}
          onChange={setSelectedShareTypes}
        />

        {/* Price range filter */}
        <PriceRangeFilter
          rentFrom={rentFrom}
          rentTo={rentTo}
          setRentFrom={setRentFrom}
          setRentTo={setRentTo}
          rentRange={dynamicOptions.rentRange}
        />

        {/* Bedroom count range filter */}
        <BedroomFilter
          bedroomsFrom={bedroomsFrom}
          bedroomsTo={bedroomsTo}
          setBedroomsFrom={setBedroomsFrom}
          setBedroomsTo={setBedroomsTo}
          bedroomsRange={dynamicOptions.bedroomsRange}
        />

        {/* Move-in date filter */}
        <MoveInDateFilter date={date} onSelect={handleSelectDate} />
      </div>

      {/* Action buttons */}
      <FilterActionButtons
        onReset={resetFilters}
        onApply={applyFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  )
}
