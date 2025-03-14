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
      // This is where you would initialize your map
      // For example with Google Maps, Mapbox, Leaflet, etc.
      // For now, we'll just show a placeholder with the coordinates

      const mapElement = mapRef.current
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-muted rounded-lg">
          <div class="text-center p-6">
            <h3 class="font-medium mb-2">Property Location</h3>
            <p class="text-muted-foreground mb-4">${listing.propertyAddress}</p>
            <p class="text-sm">
              Coordinates: ${listing.propertyLatitude.toFixed(6)}, ${listing.propertyLongitude.toFixed(6)}
            </p>
          </div>
        </div>
      `
    }
  }, [listing])

  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-4">Location</h3>
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg"
        aria-label={`Map showing location of ${listing.propertyName} at ${listing.propertyAddress}`}
      />
      <div className="mt-4">
        <h4 className="font-medium mb-2">Address</h4>
        <p className="text-muted-foreground">{listing.propertyAddress}</p>
        <p className="text-muted-foreground">
          {listing.propertyPostalCode}, {listing.city}
        </p>
        <p className="text-muted-foreground">{listing.countryName}</p>
      </div>
    </div>
  )
}
