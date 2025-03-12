"use client"

import { useId, useState } from "react"

import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Option {
  label: string
  value: string
}

interface OptionSelectFilterProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

export function OptionSelectFilter({
  options,
  selectedValues,
  onChange,
}: OptionSelectFilterProps) {
  const [open, setOpen] = useState(false)
  const idPrefix = useId()

  // Function to handle toggling individual options
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  // Function to clear all selections
  const handleClearAll = () => {
    onChange([])
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between text-left font-normal w-full"
          >
            <span className="text-sm truncate max-w-[200px] inline-block">
              {selectedValues.length
                ? options
                    .filter((opt) => selectedValues.includes(opt.value))
                    .map((opt) => opt.label)
                    .join(", ")
                : "All Types of Stay"}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {/* All Types of Stay option */}
                <CommandItem
                  className="flex items-center p-2 cursor-pointer hover:underline"
                  onSelect={handleClearAll}
                >
                  <span className="font-medium">All types of stay</span>
                </CommandItem>

                {/* Individual options with checkboxes */}
                {options.map((option) => {
                  const checkboxId = `${idPrefix}-option-${option.value}`
                  return (
                    <CommandItem
                      key={option.value}
                      className="flex items-center p-2 cursor-pointer hover:underline"
                      onSelect={() => handleToggle(option.value)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={checkboxId}
                          checked={selectedValues.includes(option.value)}
                          onCheckedChange={() => handleToggle(option.value)}
                          className="cursor-pointer"
                        />
                        <Label
                          htmlFor={checkboxId}
                          className="text-sm font-normal cursor-pointer flex-1"
                          onClick={(e) => {
                            e.preventDefault()
                            handleToggle(option.value)
                          }}
                        >
                          {option.label}
                        </Label>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
