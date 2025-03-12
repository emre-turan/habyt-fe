"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Listing } from "@/types/listing"
import { getShareTypeOptions } from "@/lib/share-types"
import { cn } from "@/lib/utils"
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

import { OptionSelectFilter } from "./option-select-filter"

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL parameters
  const [city, setCity] = useState<string>(searchParams.get("city") || "")
  const [rentFrom, setRentFrom] = useState<string>(
    searchParams.get("rentFrom") || ""
  )
  const [rentTo, setRentTo] = useState<string>(searchParams.get("rentTo") || "")
  const [selectedShareTypes, setSelectedShareTypes] = useState<string[]>(() => {
    const params = searchParams.getAll("shareType")
    return params.length > 0 ? params : []
  })
  const [bookableOn, setBookableOn] = useState<string>(
    searchParams.get("bookableOn") || ""
  )
  const [date, setDate] = useState<Date | undefined>(
    bookableOn ? new Date(bookableOn) : undefined
  )
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Get share type options from utility
  const shareTypes = getShareTypeOptions()

  // Fetch unique cities for dropdown
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch("/api/listings")
        if (!response.ok) throw new Error("Failed to fetch listings")
        const data = await response.json()

        // Extract unique cities
        const uniqueCities = Array.from(
          new Set(data.data.map((listing: Listing) => listing.city))
        ).sort()

        setCities(uniqueCities as string[])
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [])

  // Update bookableOn when date changes
  useEffect(() => {
    if (date) {
      setBookableOn(format(date, "yyyy-MM-dd"))
    } else {
      setBookableOn("")
    }
  }, [date])

  const handleSelectDate = (newDate: Date | undefined) => {
    setDate(newDate)
    setCalendarOpen(false)
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (city) params.append("city", city)
    if (rentFrom) params.append("rentFrom", rentFrom)
    if (rentTo) params.append("rentTo", rentTo)
    if (bookableOn) params.append("bookableOn", bookableOn)

    // Add all selected share types
    selectedShareTypes.forEach((type) => {
      params.append("shareType", type)
    })

    router.push(`/listings?${params.toString()}`)
  }

  const resetFilters = () => {
    setCity("")
    setRentFrom("")
    setRentTo("")
    setSelectedShareTypes([])
    setBookableOn("")
    setDate(undefined)
    router.push("/listings")
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Filter Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* City filter */}
            <div className="space-y-1 h-10">
              <Label htmlFor="city">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full" id="city">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((cityName) => (
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
