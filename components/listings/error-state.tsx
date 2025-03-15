import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-12 bg-muted p-2">
      <AlertCircle className="size-8 md:size-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-base md:text-lg font-medium mb-2">Error</h3>
      <p className="text-xs md:text-sm text-muted-foreground ">{message}</p>
    </div>
  )
}
