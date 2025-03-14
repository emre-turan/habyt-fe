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

interface ImageGalleryProps {
  listing: Listing
}

export function ImageGallery({ listing }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)

  // Combine all images from property, apartment, and room
  const allImages = [
    ...(listing.propertyImages || []),
    ...(listing.apartmentImages || []),
    ...(listing.roomImages || []),
  ]

  // If no images, show placeholder
  if (allImages.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
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

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={allImages[currentImageIndex].url || "/placeholder.svg"}
          alt={`Image ${currentImageIndex + 1} of ${listing.propertyName}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        />

        {/* Image navigation */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full opacity-80 hover:opacity-100"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full opacity-80 hover:opacity-100"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Fullscreen button */}
        <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4 rounded-full opacity-80 hover:opacity-100"
              aria-label="View fullscreen"
            >
              <Expand className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
            <DialogTitle className="sr-only">
              Property Image Gallery
            </DialogTitle>
            <div className="relative w-full h-full">
              <Image
                src={allImages[currentImageIndex].url || "/placeholder.svg"}
                alt={`Image ${currentImageIndex + 1} of ${listing.propertyName}`}
                fill
                className="object-contain"
                sizes="90vw"
              />

              {/* Fullscreen navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full opacity-80 hover:opacity-100"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full opacity-80 hover:opacity-100"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2",
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent"
              )}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
