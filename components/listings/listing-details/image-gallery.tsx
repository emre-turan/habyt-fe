"use client"

import { useState } from "react"
import Image from "next/image"

import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

import type { Listing } from "@/types/listing"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Type for a single image from any source
type GalleryImage = {
  url: string
}

// Props for the ImageGallery component
interface ImageGalleryProps {
  listing: Listing
}

// Props for the navigation buttons
interface GalleryNavigationProps {
  onPrevious: () => void
  onNext: () => void
  className?: string
}

// Props for the gallery image
interface GalleryImageDisplayProps {
  image: GalleryImage
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
}

// Props for the thumbnails
interface ThumbnailGalleryProps {
  images: GalleryImage[]
  currentIndex: number
  onSelect: (index: number) => void
}

// Props for the fullscreen dialog
interface FullscreenDialogProps {
  images: GalleryImage[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
  propertyName: string
}

// Utility function to combine all images from different sources
const combineListingImages = (listing: Listing): GalleryImage[] => {
  return [
    ...(listing.propertyImages || []),
    ...(listing.apartmentImages || []),
    ...(listing.roomImages || []),
  ]
}

// Component for gallery navigation buttons
const GalleryNavigation = ({
  onPrevious,
  onNext,
  className,
}: GalleryNavigationProps) => (
  <div
    className={cn(
      "absolute inset-0 flex items-center justify-between p-4",
      className
    )}
  >
    <Button
      variant="secondary"
      size="icon"
      className="opacity-80 hover:opacity-100"
      onClick={onPrevious}
      aria-label="Previous image"
    >
      <ChevronLeft className="size-6" />
    </Button>
    <Button
      variant="secondary"
      size="icon"
      className="opacity-80 hover:opacity-100"
      onClick={onNext}
      aria-label="Next image"
    >
      <ChevronRight className="size-6" />
    </Button>
  </div>
)

// Component for displaying a single gallery image
const GalleryImageDisplay = ({
  image,
  alt,
  priority = false,
  className,
  sizes,
}: GalleryImageDisplayProps) => (
  <Image
    src={image.url || "/placeholder-image.svg"}
    alt={alt}
    fill
    priority={priority}
    className={cn("object-cover", className)}
    sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"}
  />
)

// Component for thumbnail gallery
const ThumbnailGallery = ({
  images,
  currentIndex,
  onSelect,
}: ThumbnailGalleryProps) => (
  <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
    {images.map((image, index) => (
      <button
        key={index}
        className={cn(
          "relative w-20 h-20 overflow-hidden flex-shrink-0 border-2",
          index === currentIndex ? "border-primary" : "border-transparent"
        )}
        onClick={() => onSelect(index)}
        aria-label={`View image ${index + 1}`}
      >
        <Image
          src={image.url || "/placeholder-image.svg"}
          alt={`Thumbnail ${index + 1}`}
          fill
          className="object-cover"
          sizes="80px"
        />
      </button>
    ))}
  </div>
)

// Component for fullscreen dialog
const FullscreenDialog = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  open,
  onOpenChange,
  propertyName,
}: FullscreenDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 opacity-80 hover:opacity-100"
        aria-label="View fullscreen"
      >
        <Expand className="size-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
      <DialogTitle className="sr-only">Property Image Gallery</DialogTitle>
      <div className="relative w-full h-full">
        <GalleryImageDisplay
          image={images[currentIndex]}
          alt={`Image ${currentIndex + 1} of ${propertyName}`}
          className="object-contain"
          sizes="90vw"
        />

        <GalleryNavigation onPrevious={onPrevious} onNext={onNext} />

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

// Empty gallery placeholder
const EmptyGalleryPlaceholder = () => (
  <div className="relative w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
    <p className="text-muted-foreground">No images available</p>
  </div>
)

// Main ImageGallery component
export function ImageGallery({ listing }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)

  // Combine all images from property, apartment, and room
  const allImages = combineListingImages(listing)

  // If no images, show placeholder
  if (allImages.length === 0) {
    return <EmptyGalleryPlaceholder />
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    )
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <GalleryImageDisplay
          image={allImages[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1} of ${listing.propertyName}`}
          priority
        />

        {/* Image navigation */}
        <GalleryNavigation onPrevious={handlePrevious} onNext={handleNext} />

        {/* Fullscreen button and dialog */}
        <FullscreenDialog
          images={allImages}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          open={fullscreenOpen}
          onOpenChange={setFullscreenOpen}
          propertyName={listing.propertyName}
        />
      </div>

      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <ThumbnailGallery
          images={allImages}
          currentIndex={currentImageIndex}
          onSelect={handleThumbnailClick}
        />
      )}
    </div>
  )
}
