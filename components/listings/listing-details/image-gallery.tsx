"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { ChevronLeft, ChevronRight, Expand, ImageIcon } from "lucide-react"

import type { Listing } from "@/types/listing"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const PLACEHOLDER_IMAGE = "/placeholder-image.svg"

// Type for a single image from any source
type GalleryImage = {
  url: string
  isLoading?: boolean
  hasError?: boolean
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
interface ImageProps {
  image: GalleryImage
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
  objectFit?: "cover" | "contain"
  showErrorMessage?: boolean
}

// Props for the thumbnails
interface ThumbnailGalleryProps {
  images: GalleryImage[]
  currentIndex: number
  onSelect: (index: number) => void
  onThumbnailLoad: (index: number) => void
  onThumbnailError: (index: number) => void
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
  onImageLoad: () => void
  onImageError: () => void
}

// Utility function to combine all images from different sources
const combineListingImages = (listing: Listing): GalleryImage[] => {
  const images = [
    ...(listing.propertyImages || []),
    ...(listing.apartmentImages || []),
    ...(listing.roomImages || []),
  ]

  return images.map((img) => ({
    url: img.url,
    isLoading: true,
    hasError: false,
  }))
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

// Reusable component for displaying images with loading and error states
const GalleryImage = ({
  image,
  alt,
  priority = false,
  className,
  sizes,
  onLoad,
  onError,
  objectFit = "cover",
  showErrorMessage = true,
}: ImageProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {image.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <ImageIcon
            className={cn(
              "text-muted-foreground opacity-50",
              showErrorMessage ? "size-10" : "size-4"
            )}
          />
        </div>
      )}

      {/* Image */}
      <Image
        src={
          image.hasError ? PLACEHOLDER_IMAGE : image.url || PLACEHOLDER_IMAGE
        }
        alt={alt}
        fill
        priority={priority}
        className={cn(
          `object-${objectFit} transition-opacity duration-300`,
          image.isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        sizes={
          sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        }
        onLoad={onLoad}
        onError={onError}
        quality={80}
      />

      {/* Error state */}
      {image.hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
          <ImageIcon
            className={cn(
              "text-muted-foreground",
              showErrorMessage ? "size-10 mb-2" : "size-4"
            )}
          />
          {showErrorMessage && (
            <p className="text-sm text-muted-foreground">Image unavailable</p>
          )}
        </div>
      )}
    </div>
  )
}

// Component for thumbnail gallery with loading and error states
const ThumbnailGallery = ({
  images,
  currentIndex,
  onSelect,
  onThumbnailLoad,
  onThumbnailError,
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
        <GalleryImage
          image={image}
          alt={`Thumbnail ${index + 1}`}
          sizes="80px"
          onLoad={() => onThumbnailLoad(index)}
          onError={() => onThumbnailError(index)}
          showErrorMessage={false}
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
  onImageLoad,
  onImageError,
}: FullscreenDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 opacity-80 hover:opacity-100 z-10"
        aria-label="View fullscreen"
      >
        <Expand className="size-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
      <DialogTitle className="sr-only">Property Image Gallery</DialogTitle>
      <div className="relative w-full h-full">
        <GalleryImage
          image={images[currentIndex]}
          alt={`Image ${currentIndex + 1} of ${propertyName}`}
          className="object-contain"
          sizes="90vw"
          onLoad={onImageLoad}
          onError={onImageError}
          objectFit="contain"
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
  <div className="relative w-full h-[400px] bg-muted flex flex-col items-center justify-center">
    <ImageIcon className="size-10 text-muted-foreground mb-2" />
    <p className="text-muted-foreground">No images available</p>
  </div>
)

// Main ImageGallery component
export function ImageGallery({ listing }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])

  // Initialize images on component mount
  useEffect(() => {
    setImages(combineListingImages(listing))
  }, [listing])

  // If no images, show placeholder
  if (images.length === 0) {
    return <EmptyGalleryPlaceholder />
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Generic function to update image state
  const updateImageState = (index: number, updates: Partial<GalleryImage>) => {
    setImages((prevImages) => {
      const newImages = [...prevImages]
      newImages[index] = {
        ...newImages[index],
        ...updates,
      }
      return newImages
    })
  }

  const handleImageLoad = () => {
    updateImageState(currentImageIndex, { isLoading: false })
  }

  const handleImageError = () => {
    updateImageState(currentImageIndex, { isLoading: false, hasError: true })
  }

  const handleThumbnailLoad = (index: number) => {
    updateImageState(index, { isLoading: false })
  }

  const handleThumbnailError = (index: number) => {
    updateImageState(index, { isLoading: false, hasError: true })
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <GalleryImage
          image={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1} of ${listing.propertyName}`}
          priority
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Image navigation */}
        <GalleryNavigation onPrevious={handlePrevious} onNext={handleNext} />

        {/* Fullscreen button and dialog */}
        <FullscreenDialog
          images={images}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          open={fullscreenOpen}
          onOpenChange={setFullscreenOpen}
          propertyName={listing.propertyName}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <ThumbnailGallery
          images={images}
          currentIndex={currentImageIndex}
          onSelect={handleThumbnailClick}
          onThumbnailLoad={handleThumbnailLoad}
          onThumbnailError={handleThumbnailError}
        />
      )}
    </div>
  )
}
