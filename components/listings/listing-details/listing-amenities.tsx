import { CheckIcon } from "lucide-react"

import type { Listing } from "@/types/listing"
import { Separator } from "@/components/ui/separator"

interface ListingAmenitiesProps {
  listing: Listing
}

export function ListingAmenities({ listing }: ListingAmenitiesProps) {
  // Group amenities by type
  const roomAmenities = listing.roomAmenities || []
  const apartmentAmenities = listing.apartmentAmenities || []
  const propertyAmenities = listing.propertyAmenities || []

  return (
    <div className="space-y-4 md:space-y-8 py-2 md:py-4">
      {/* Room amenities */}
      {roomAmenities.length > 0 && (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
            Room Amenities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 text-sm md:text-base">
            {roomAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {roomAmenities.length > 0 && apartmentAmenities.length > 0 && (
        <Separator />
      )}

      {/* Apartment amenities */}
      {apartmentAmenities.length > 0 && (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
            Apartment Amenities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 text-sm md:text-base">
            {apartmentAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {apartmentAmenities.length > 0 && propertyAmenities.length > 0 && (
        <Separator />
      )}

      {/* Property amenities */}
      {propertyAmenities.length > 0 && (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
            Property Amenities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 text-sm md:text-base">
            {propertyAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* If no amenities */}
      {roomAmenities.length === 0 &&
        apartmentAmenities.length === 0 &&
        propertyAmenities.length === 0 && (
          <div className="text-center py-4 md:py-8">
            <p className="text-muted-foreground text-sm md:text-base">
              No amenities information available
            </p>
          </div>
        )}
    </div>
  )
}
