import { Filter } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-muted p-2">
      <Filter className="size-8 md:size-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-base md:text-lg font-medium mb-2">
        No listings found
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground ">
        Try adjusting your filters to find more results.
      </p>
    </div>
  )
}
