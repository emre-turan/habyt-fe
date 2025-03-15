"use client"

import { FilterIcon, SlidersHorizontal } from "lucide-react"

import type { FilterHookReturn } from "@/types/filter"
import { useListingsFilters } from "@/hooks/use-listing-filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { FilterContent } from "./filter-content"

export function FilterBar() {
  const { filters, setters, actions }: FilterHookReturn = useListingsFilters()

  // Destructure values from the hook
  const {
    city,
    rentFrom,
    rentTo,
    selectedShareTypes,
    date,
    bedroomsFrom,
    bedroomsTo,
  } = filters

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
          <FilterContent
            filters={filters}
            setters={setters}
            actions={actions}
          />
        </CardContent>
      </Card>

      {/* Mobile filter button and drawer */}
      <div className="md:hidden mb-4">
        <Drawer>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Listings</h2>
            <DrawerTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="size-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="max-h-[85vh] pb-6 px-6">
            <DrawerTitle className="text-lg font-semibold my-6 flex items-center">
              <FilterIcon className="mr-2 size-5" />
              Filter Options
            </DrawerTitle>
            <FilterContent
              filters={filters}
              setters={setters}
              actions={actions}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
