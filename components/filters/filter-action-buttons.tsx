"use client"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FilterActionButtonsProps {
  onReset: () => void
  onApply: () => void
  activeFilterCount: number
}

/**
 * Filter action buttons component
 */
export function FilterActionButtons({
  onReset,
  onApply,
  activeFilterCount,
}: FilterActionButtonsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button variant="outline" onClick={onReset}>
        <X className="mr-2 size-4" />
        Reset
      </Button>
      <Button onClick={onApply}>
        Apply Filters
        {activeFilterCount > 0 && (
          <Badge variant={"secondary"} className="ml-1">
            {activeFilterCount}
          </Badge>
        )}
      </Button>
    </div>
  )
}
