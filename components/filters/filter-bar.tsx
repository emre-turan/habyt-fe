"use client"

import { format } from "date-fns"
import { CalendarIcon, FilterIcon, SlidersHorizontal, X } from "lucide-react"

import { getShareTypeOptions } from "@/lib/share-types"
import { cn } from "@/lib/utils"
import { useCitiesQuery } from "@/hooks/queries/use-cities-query"
import { useListingsQuery } from "@/hooks/queries/use-listings-query"
import { useDynamicFilterOptions } from "@/hooks/use-dynamic-filter-options"
import { useListingsFilters } from "@/hooks/use-listing-filters"
import { usePreviewQueryString } from "@/hooks/use-preview-query-string"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Loading } from "@/components/shared/loading"

import { HelpTooltip } from "../shared/help-tooltip"
import { OptionSelectFilter } from "./option-select-filter"

export function FilterBar() {
  const { filters, setters, actions } = useListingsFilters()
  const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery()

  // Get preview query string from the dedicated hook
  const getPreviewQueryString = usePreviewQueryString(filters)
  const previewQueryString = getPreviewQueryString()

  // Get preview data for dynamic filter options
  const { data: previewData } = useListingsQuery(previewQueryString)
  const previewListings = previewData?.data || []

  // Use preview listings for dynamic filter options
  const dynamicOptions = useDynamicFilterOptions(previewListings)

  // Destructure values from the hook
  const {
    city,
    rentFrom,
    rentTo,
    selectedShareTypes,
    date,
    calendarOpen,
    bedroomsFrom,
    bedroomsTo,
  } = filters
  const {
    setCity,
    setRentFrom,
    setRentTo,
    setCalendarOpen,
    setSelectedShareTypes,
    setBedroomsFrom,
    setBedroomsTo,
  } = setters
  const { handleSelectDate, applyFilters, resetFilters } = actions

  // Get share type options from dynamic options or fallback to utility
  const shareTypes =
    dynamicOptions.shareTypes.length > 0
      ? dynamicOptions.shareTypes
      : getShareTypeOptions()

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

  // Filter content to be used in both desktop and mobile views
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {/* City filter */}
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label className="text-sm font-medium">Type of Stay</Label>
          <OptionSelectFilter
            options={shareTypes}
            selectedValues={selectedShareTypes}
            onChange={setSelectedShareTypes}
          />
        </div>

        {/* Price range filter */}
        <div className="space-y-2">
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
        <div className="space-y-2">
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

        {/* Move-in date filter */}
        <div className="space-y-2">
          <Label htmlFor="bookableOn" className="text-sm font-medium">
            Move-in Date
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="bookableOn"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={resetFilters}>
          <X className="mr-2 size-4" />
          Reset
        </Button>
        <Button
          onClick={applyFilters}
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filter bar */}
      <Card className="mb-8 shadow-md border-muted/40 overflow-hidden hidden md:block py-0">
        <CardHeader className="bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <FilterIcon className="mr-2 h-5 w-5 text-primary" />
              Find Your Perfect Home
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}{" "}
                  {activeFilterCount === 1 ? "filter" : "filters"} active
                </Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <FilterContent />
        </CardContent>
      </Card>

      {/* Mobile filter button and sheet */}
      <div className="md:hidden mb-4">
        <Sheet>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Listings</h2>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="bottom" className=" p-6">
            <div className="h-full overflow-y-auto pb-16">
              <SheetTitle className="text-lg font-semibold mb-4 flex items-center">
                <FilterIcon className="mr-2 size-5 text-primary" />
                Filter Options
              </SheetTitle>
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
