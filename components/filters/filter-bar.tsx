"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { getShareTypeOptions } from "@/lib/share-types"
import { cn } from "@/lib/utils"
import { useCitiesQuery } from "@/hooks/use-cities-query"
import { useListingsFilters } from "@/hooks/use-listing-filters"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Loading } from "@/components/shared/loading"

import { OptionSelectFilter } from "./option-select-filter"

export function FilterBar() {
  // Use the custom hook for filter state management
  const { filters, setters, actions } = useListingsFilters()
  const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery()

  // Destructure values from the hook
  const { city, rentFrom, rentTo, selectedShareTypes, date, calendarOpen } =
    filters
  const {
    setCity,
    setRentFrom,
    setRentTo,
    setCalendarOpen,
    setSelectedShareTypes,
  } = setters
  const { handleSelectDate, applyFilters, resetFilters } = actions

  // Get share type options from utility
  const shareTypes = getShareTypeOptions()

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Find Your Perfect Home</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* City filter */}
            <div className="space-y-1 h-10">
              <Label htmlFor="city">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full" id="city">
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
            <div className="space-y-1 h-10">
              <Label>Type of Stay</Label>
              <OptionSelectFilter
                options={shareTypes}
                selectedValues={selectedShareTypes}
                onChange={setSelectedShareTypes}
              />
            </div>

            {/* Price range filter */}
            <div className="space-y-1 h-10">
              <Label>Monthly Rent</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  id="rentFrom"
                  placeholder="Min"
                  value={rentFrom}
                  onChange={(e) => setRentFrom(e.target.value)}
                />
                <span>-</span>
                <Input
                  type="number"
                  id="rentTo"
                  placeholder="Max"
                  value={rentTo}
                  onChange={(e) => setRentTo(e.target.value)}
                />
              </div>
            </div>

            {/* Move-in date filter */}
            <div className="space-y-1 h-10">
              <Label htmlFor="bookableOn">Move-in Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="bookableOn"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
