"use client"

import { useState } from "react"
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
 * Implements proper lazy loading and placeholder strategies for optimal performance.
 */
export function ListingImage({
  listing,
  priority = false,
  showBadge = true,
  height = "h-48",
  className,
  alt,
}: ListingImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(getMainImage(listing))
  const [imgError, setImgError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Handle image loading error
  const handleImageError = () => {
    if (!imgError) {
      setImgSrc("/placeholder-image.svg")
      setImgError(true)
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={cn("relative w-full overflow-hidden", height, className)}>
      {/* Loading placeholder */}
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
      <Image
        src={imgSrc || "/placeholder-image.svg"}
        alt={alt || listing.propertyName || "Property"}
        fill
        style={{
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        onError={handleImageError}
        onLoad={handleImageLoad}
        quality={80}
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
