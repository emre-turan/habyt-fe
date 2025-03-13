import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingProps {
  text?: string
}

export const Loading = ({ text }: LoadingProps) => {
  return (
    <>
      <Loader2 className={cn("size-4 animate-spin", text && "mr-2")} />
      {text && <span>{text}</span>}
    </>
  )
}
