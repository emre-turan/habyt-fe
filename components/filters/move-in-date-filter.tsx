"use client"

import { Label } from "@/components/ui/label"

import { DatePicker } from "./date-picker"
import { FilterItemWrapper } from "./filter-item-wrapper"

interface MoveInDateFilterProps {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
}

/**
 * Move-in date filter component
 */
export function MoveInDateFilter({ date, onSelect }: MoveInDateFilterProps) {
  return (
    <FilterItemWrapper>
      <Label htmlFor="bookableOn" className="text-sm font-medium">
        Move-in Date
      </Label>
      <DatePicker date={date} onSelect={onSelect} label="Select Move-in Date" />
    </FilterItemWrapper>
  )
}
