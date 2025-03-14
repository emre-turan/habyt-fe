import { CheckIcon } from "lucide-react"

import type { Listing } from "@/types/listing"
import { Separator } from "@/components/ui/separator"

type AmenityType = "room" | "apartment" | "property"

interface AmenityGroupProps {
  title: string
  amenities: string[]
}

interface ListingAmenitiesProps {
  listing: Listing
}

// Utility function to get amenities by type
const getAmenitiesByType = (
  listing: Listing
): Record<AmenityType, string[]> => {
  return {
    room: listing.roomAmenities || [],
    apartment: listing.apartmentAmenities || [],
    property: listing.propertyAmenities || [],
  }
}

// Utility function to get display title for amenity type
const getAmenityTypeTitle = (type: AmenityType): string => {
  const titles: Record<AmenityType, string> = {
    room: "Room Amenities",
    apartment: "Apartment Amenities",
    property: "Property Amenities",
  }
  return titles[type]
}

// Component for a single amenity item
const AmenityItem = ({ amenity }: { amenity: string }) => (
  <div className="flex items-center">
    <CheckIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
    <span>{amenity}</span>
  </div>
)

// Component for a group of amenities
const AmenityGroup = ({ title, amenities }: AmenityGroupProps) => (
  <div>
    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 text-sm md:text-base">
      {amenities.map((amenity, index) => (
        <AmenityItem key={index} amenity={amenity} />
      ))}
    </div>
  </div>
)

// Component for when no amenities are available
const NoAmenities = () => (
  <div className="text-center py-4 md:py-8">
    <p className="text-muted-foreground text-sm md:text-base">
      No amenities information available
    </p>
  </div>
)

// Main component
export function ListingAmenities({ listing }: ListingAmenitiesProps) {
  // Get amenities grouped by type
  const amenitiesByType = getAmenitiesByType(listing)

  // Check if any amenities exist
  const hasAnyAmenities = Object.values(amenitiesByType).some(
    (group) => group.length > 0
  )

  // If no amenities, show placeholder
  if (!hasAnyAmenities) {
    return <NoAmenities />
  }

  // Get array of types that have amenities
  const typesWithAmenities = Object.entries(amenitiesByType)
    .filter(([, amenities]) => amenities.length > 0)
    .map(([type]) => type as AmenityType)

  return (
    <div className="space-y-4 md:space-y-8 py-2 md:py-4">
      {typesWithAmenities.map((type, index) => (
        <div key={type}>
          {/* Add separator between groups */}
          {index > 0 && <Separator className="my-4 md:my-8" />}

          {/* Render amenity group */}
          <AmenityGroup
            title={getAmenityTypeTitle(type)}
            amenities={amenitiesByType[type]}
          />
        </div>
      ))}
    </div>
  )
}
