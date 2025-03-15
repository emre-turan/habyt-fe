"use client"

import { Input } from "@/components/ui/input"

export interface RangeValues {
  min: number
  max: number
}

interface RangeInputsProps {
  fromValue: string
  toValue: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  fromId: string
  toId: string
}

/**
 * Reusable range input component for min-max value pairs
 */
export function RangeInputs({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  fromId,
  toId,
}: RangeInputsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        id={fromId}
        placeholder="Min"
        value={fromValue}
        onChange={(e) => onFromChange(e.target.value)}
        className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      />
      <span>-</span>
      <Input
        type="number"
        id={toId}
        placeholder="Max"
        value={toValue}
        onChange={(e) => onToChange(e.target.value)}
        className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      />
    </div>
  )
}
