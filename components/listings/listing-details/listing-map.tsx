"use client"

import { useEffect, useRef } from "react"

import type { Listing } from "@/types/listing"

interface ListingMapProps {
  listing: Listing
}

export function ListingMap({ listing }: ListingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if we're in the browser and if the listing has coordinates
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      listing.propertyLatitude &&
      listing.propertyLongitude
    ) {
      // This is where we would initialize our map
      // For example with Google Maps, Mapbox, Leaflet, etc.
      // For now, I'll just show a placeholder with the coordinates

      const mapElement = mapRef.current
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-muted rounded-lg">
          <div class="text-center p-4 md:p-6">
            <h3 class="font-medium mb-1 md:mb-2 text-sm md:text-base">Property Location</h3>
            <p class="text-muted-foreground mb-2 md:mb-4 text-xs md:text-sm">${listing.propertyAddress}</p>
            <p class="text-xs md:text-sm">
              Coordinates: ${listing.propertyLatitude.toFixed(6)}, ${listing.propertyLongitude.toFixed(6)}
            </p>
          </div>
        </div>
      `
    }
  }, [listing])

  return (
    <div className="py-2 md:py-4">
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
        Location
      </h3>
      <div
        ref={mapRef}
        className="w-full h-[250px] md:h-[400px] rounded-lg"
        aria-label={`Map showing location of ${listing.propertyName} at ${listing.propertyAddress}`}
      />
      <div className="mt-2 md:mt-4">
        <h4 className="font-medium mb-1 md:mb-2 text-sm md:text-base">
          Address
        </h4>
        <p className="text-muted-foreground text-xs md:text-sm">
          {listing.propertyAddress}
        </p>
        <p className="text-muted-foreground text-xs md:text-sm">
          {listing.propertyPostalCode}, {listing.city}
        </p>
        <p className="text-muted-foreground text-xs md:text-sm">
          {listing.countryName}
        </p>
      </div>
    </div>
  )
}
