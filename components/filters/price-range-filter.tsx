"use client"

import { Label } from "@/components/ui/label"
import { HelpTooltip } from "@/components/shared/help-tooltip"

import { FilterItemWrapper } from "./filter-item-wrapper"
import { RangeInputs, type RangeValues } from "./range-inputs"

interface PriceRangeFilterProps {
  rentFrom: string
  rentTo: string
  setRentFrom: (value: string) => void
  setRentTo: (value: string) => void
  rentRange: RangeValues
}

/**
 * Price range filter component
 */
export function PriceRangeFilter({
  rentFrom,
  rentTo,
  setRentFrom,
  setRentTo,
  rentRange,
}: PriceRangeFilterProps) {
  return (
    <FilterItemWrapper>
      <div className="flex items-center space-x-1">
        <Label className="text-sm font-medium">Monthly Rent</Label>
        <HelpTooltip>
          Filter by monthly rent amount (Range: {rentRange.min} -{" "}
          {rentRange.max})
        </HelpTooltip>
      </div>
      <RangeInputs
        fromValue={rentFrom}
        toValue={rentTo}
        onFromChange={setRentFrom}
        onToChange={setRentTo}
        fromId="rentFrom"
        toId="rentTo"
      />
    </FilterItemWrapper>
  )
}
