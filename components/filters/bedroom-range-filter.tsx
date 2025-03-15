"use client"

import { Label } from "@/components/ui/label"
import { HelpTooltip } from "@/components/shared/help-tooltip"

import { FilterItemWrapper } from "./filter-item-wrapper"
import { RangeInputs, type RangeValues } from "./range-inputs"

interface BedroomFilterProps {
  bedroomsFrom: string
  bedroomsTo: string
  setBedroomsFrom: (value: string) => void
  setBedroomsTo: (value: string) => void
  bedroomsRange: RangeValues
}

/**
 * Bedroom count filter component
 */
export function BedroomFilter({
  bedroomsFrom,
  bedroomsTo,
  setBedroomsFrom,
  setBedroomsTo,
  bedroomsRange,
}: BedroomFilterProps) {
  return (
    <FilterItemWrapper>
      <div className="flex items-center space-x-1">
        <Label className="text-sm font-medium">Bedrooms</Label>
        <HelpTooltip>
          Filter by number of bedrooms (Range: {bedroomsRange.min} -{" "}
          {bedroomsRange.max})
        </HelpTooltip>
      </div>
      <RangeInputs
        fromValue={bedroomsFrom}
        toValue={bedroomsTo}
        onFromChange={setBedroomsFrom}
        onToChange={setBedroomsTo}
        fromId="bedroomsFrom"
        toId="bedroomsTo"
      />
    </FilterItemWrapper>
  )
}
