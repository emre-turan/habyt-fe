"use client"

import { useState } from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
  label?: string
}

export function DatePicker({
  date,
  onSelect,
  label = "Select date",
}: DatePickerProps) {
  const isMobile = useMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <Button
          id="mobile-date-picker"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsDialogOpen(true)}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[300px] sm:max-w-[425px] ps-3">
            <DialogHeader>
              <DialogTitle className="text-base">{label}</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                onSelect(newDate)
                setIsDialogOpen(false)
              }}
              initialFocus
            />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          id="desktop-date-picker"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onSelect(newDate)
            setIsPopoverOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
