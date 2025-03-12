import { Filter } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-muted">
      <Filter className="size-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No listings found</h3>
      <p className="text-muted-foreground text-sm">
        Try adjusting your filters to find more results.
      </p>
    </div>
  )
}
