"use client"

import { X } from "lucide-react"

import type { FilterActions, FilterSetters, FilterState } from "@/types/filter"
import { getShareTypeOptions } from "@/lib/share-types"
import { useCitiesQuery } from "@/hooks/queries/use-cities-query"
import { useListingsQuery } from "@/hooks/queries/use-listings-query"
import { useDynamicFilterOptions } from "@/hooks/use-dynamic-filter-options"
import { usePreviewQueryString } from "@/hooks/use-preview-query-string"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { OptionSelectFilter } from "@/components/filters/option-select-filter"
import { HelpTooltip } from "@/components/shared/help-tooltip"
import { Loading } from "@/components/shared/loading"

import { DatePicker } from "./date-picker"

interface FilterContentProps {
  filters: FilterState
  setters: FilterSetters
  actions: FilterActions
}

export function FilterContent({
  filters,
  setters,
  actions,
}: FilterContentProps) {
  const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery()

  // Get preview query string from the dedicated hook
  const getPreviewQueryString = usePreviewQueryString(filters)
  const previewQueryString = getPreviewQueryString()

  // Get preview data for dynamic filter options
  const { data: previewData } = useListingsQuery(previewQueryString)
  const previewListings = previewData?.data || []

  // Use preview listings for dynamic filter options
  const dynamicOptions = useDynamicFilterOptions(previewListings)
  // Get share type options from dynamic options or fallback to utility
  const shareTypes =
    dynamicOptions.shareTypes.length > 0
      ? dynamicOptions.shareTypes
      : getShareTypeOptions()

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {/* City filter */}
        <div className="space-y-2 h-14">
          <Label htmlFor="city" className="text-sm font-medium">
            City
          </Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger
              className="w-full bg-background border-input hover:bg-accent hover:text-accent-foreground transition-colors"
              id="city"
            >
              <div className="flex items-center justify-between w-full">
                <SelectValue placeholder="All Cities" />
                {citiesLoading && <Loading />}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {citiesLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="px-2 py-1.5">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))
                : cities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property type filter */}
        <div className="space-y-2 h-14">
          <Label className="text-sm font-medium">Type of Stay</Label>
          <OptionSelectFilter
            options={shareTypes}
            selectedValues={selectedShareTypes}
            onChange={setSelectedShareTypes}
          />
        </div>

        {/* Price range filter */}
        <div className="space-y-2 h-14">
          <div className="flex items-center space-x-1">
            <Label className="text-sm font-medium">Monthly Rent</Label>
            <HelpTooltip>
              Filter by monthly rent amount (Range:{" "}
              {dynamicOptions.rentRange.min} - {dynamicOptions.rentRange.max})
            </HelpTooltip>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              id="rentFrom"
              placeholder="Min"
              value={rentFrom}
              onChange={(e) => setRentFrom(e.target.value)}
              className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            />
            <span>-</span>
            <Input
              type="number"
              id="rentTo"
              placeholder="Max"
              value={rentTo}
              onChange={(e) => setRentTo(e.target.value)}
              className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            />
          </div>
        </div>

        {/* Bedroom count range filter */}
        <div className="space-y-2 h-14">
          <div className="flex items-center space-x-1">
            <Label className="text-sm font-medium">Bedrooms</Label>
            <HelpTooltip>
              Filter by number of bedrooms (Range:{" "}
              {dynamicOptions.bedroomsRange.min} -{" "}
              {dynamicOptions.bedroomsRange.max})
            </HelpTooltip>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              id="bedroomsFrom"
              placeholder="Min"
              value={bedroomsFrom}
              onChange={(e) => setBedroomsFrom(e.target.value)}
              className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            />
            <span>-</span>
            <Input
              type="number"
              id="bedroomsTo"
              placeholder="Max"
              value={bedroomsTo}
              onChange={(e) => setBedroomsTo(e.target.value)}
              className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 h-14">
          <Label htmlFor="bookableOn" className="text-sm font-medium">
            Move-in Date
          </Label>
          <DatePicker
            date={date}
            onSelect={handleSelectDate}
            label="Select Move-in Date"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={resetFilters}>
          <X className="mr-2 size-4" />
          Reset
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  )
}
