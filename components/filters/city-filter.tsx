"use client"

import { useCitiesQuery } from "@/hooks/queries/use-cities-query"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Loading } from "@/components/shared/loading"

import { FilterItemWrapper } from "./filter-item-wrapper"

interface CityFilterProps {
  value: string
  onChange: (value: string) => void
}

/**
 * City selection filter component
 */
export function CityFilter({ value, onChange }: CityFilterProps) {
  const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery()

  return (
    <FilterItemWrapper>
      <Label htmlFor="city" className="text-sm font-medium">
        City
      </Label>
      <Select value={value} onValueChange={onChange}>
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
    </FilterItemWrapper>
  )
}
