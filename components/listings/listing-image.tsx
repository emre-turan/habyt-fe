import Image from "next/image"

import type { Listing } from "@/types/listing"
import { geistMono } from "@/lib/fonts"
import { getMainImage } from "@/lib/listing-images"
import { formatShareType } from "@/lib/share-types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ListingImageProps {
  listing: Listing
  priority?: boolean
  showBadge?: boolean
  height?: string
  className?: string
  alt?: string
}

/**
 * A reusable component for displaying listing images with consistent styling and behavior.
 * Handles image selection logic and displays a badge with the share type if requested.
 */
export function ListingImage({
  listing,
  priority = false,
  showBadge = true,
  height = "h-48",
  className,
  alt,
}: ListingImageProps) {
  const imageUrl = getMainImage(listing)

  return (
    <div className={cn("relative w-full", height, className)}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={alt || listing.propertyName || "Property"}
        fill
        style={{ objectFit: "cover" }}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {showBadge && (
        <Badge
          className={cn(
            geistMono.className,
            "absolute top-2 right-2 bg-primary text-primary-foreground uppercase font-normal"
          )}
        >
          {formatShareType(listing.shareType)}
        </Badge>
      )}
    </div>
  )
}
