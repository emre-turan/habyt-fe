import Link from "next/link"

import { HomeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function ListingNotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center text-center space-y-6 h-screen">
        <div className="text-muted-foreground">
          <HomeIcon className="size-16" />
        </div>
        <h1 className="text-4xl font-bold">Listing Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          The listing you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/listings">Back to Listings</Link>
        </Button>
      </div>
    </Container>
  )
}
