import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FilterBarSkeleton() {
  return (
    <>
      {/* Desktop filter skeleton */}
      <Card className="mb-8 shadow-md border-muted/40 overflow-hidden hidden md:block py-0">
        <CardHeader className="bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile filter skeleton */}
      <div className="md:hidden mb-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </>
  )
}
