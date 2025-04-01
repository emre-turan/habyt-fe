import { HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HelpTooltipProps {
  children: React.ReactNode
  className?: string
}

/**
 * A simple reusable tooltip component that displays help content.
 *
 * @example
 * ```tsx
 * <Label>
 *   Monthly Rent <HelpTooltip>Filter by monthly rent amount in EUR</HelpTooltip>
 * </Label>
 * ```
 */
export function HelpTooltip({ children, className }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            className={cn(
              "size-3 text-muted-foreground cursor-help inline-block",
              className
            )}
            aria-hidden="true"
          />
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <div className="max-w-xs text-xs">{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
