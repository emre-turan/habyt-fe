import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-12 bg-muted">
      <AlertCircle className="size-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Error</h3>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}
