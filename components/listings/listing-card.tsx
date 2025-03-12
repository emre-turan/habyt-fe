import Image from "next/image"

import {
  BedIcon,
  HomeIcon,
  RulerIcon,
  ShowerHeadIcon as ShowerIcon,
} from "lucide-react"

import type { Listing } from "@/types/listing"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  // Get the first image from property, apartment, or room (in that order of preference)
  const getMainImage = () => {
    if (listing.propertyImages && listing.propertyImages.length > 0) {
      return listing.propertyImages[0].url
    }
    if (listing.apartmentImages && listing.apartmentImages.length > 0) {
      return listing.apartmentImages[0].url
    }
    if (listing.roomImages && listing.roomImages.length > 0) {
      return listing.roomImages[0].url
    }
    return "/placeholder-image.svg" // Fallback image
  }

  // Get a description in english if available
  const getDescription = () => {
    const descriptions = [...(listing.roomDescriptions || [])]
    const englishDesc = descriptions.find((desc) => desc.language === "EN")
    return englishDesc?.description || "No description available"
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: listing.currency || "EUR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Helper function to display share type in a more readable format
  const formatShareType = (shareType: string) => {
    switch (shareType) {
      case "PrivateApartment":
        return "Private Apartment"
      case "PrivateRoom":
        return "Private Room"
      case "SharedRoom":
        return "Shared Room"
      case "Studio":
        return "Studio"
      default:
        return shareType
    }
  }

  // Safe access to minimumStay information
  const getMinimumStay = () => {
    if (!listing.leaseConditions || !listing.leaseConditions.minimumStay) {
      return "Not specified"
    }
    return `${listing.leaseConditions.minimumStay.amount} ${listing.leaseConditions.minimumStay.unit}`
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col py-0">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={getMainImage() || "/placeholder.svg"}
          alt={listing.propertyName || "Property"}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {formatShareType(listing.shareType)}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle>{listing.shareType}</CardTitle>
        <CardDescription>{listing.propertyAddress}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow pb-0">
        <Separator />

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <RulerIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">Area:</span>
            <span className="font-medium">
              {listing.roomArea} {listing.roomAreaUnit}
            </span>
          </div>
          <div className="flex items-center">
            <BedIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">Bedrooms:</span>
            <span className="font-medium">{listing.apartmentBedroomCount}</span>
          </div>
          <div className="flex items-center">
            <ShowerIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">Bathrooms:</span>
            <span className="font-medium">
              {listing.apartmentBathroomCount}
            </span>
          </div>
          <div className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground mr-1 truncate">Min stay:</span>
            <span className="font-medium truncate">{getMinimumStay()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-0">
        <div className="bg-muted w-full px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-sm border rounded-none px-2 py-1">
              From{" "}
              {new Date(listing.bookingWindow.bookableFrom).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
            </p>
          </div>
          <div className="text-right">
            {listing.discount > 0 && (
              <span className="text-muted-foreground line-through mr-2 text-sm">
                {formatCurrency(listing.rentGross)}
              </span>
            )}
            <span className="text-lg font-bold text-secondary">
              {formatCurrency(listing.rentNet)}
            </span>
            <p className="text-sm text-muted-foreground -mt-1">monthly</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
