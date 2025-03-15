"use client"

import { FilterIcon, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { FilterContent } from "./filter-bar-content"

export function FilterBar() {
  return (
    <>
      {/* Desktop filter bar */}
      <Card className="mb-8 shadow-md border-muted/40 overflow-hidden hidden md:block py-0">
        <CardHeader className="bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <FilterIcon className="mr-2 h-5 w-5 text-primary" />
              Find Your Perfect Home
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <FilterContent />
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
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="max-h-[85vh] pb-6 px-6">
            <DrawerTitle className="text-lg font-semibold my-6 flex items-center">
              <FilterIcon className="mr-2 size-5" />
              Filter Options
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Filter by city, type of stay, monthly rent, bedrooms, and move-in
              date.
            </DrawerDescription>
            <FilterContent />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
