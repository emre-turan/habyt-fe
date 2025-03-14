import Link from "next/link"

import {
  BedIcon,
  HomeIcon,
  RulerIcon,
  ShowerHeadIcon as ShowerIcon,
} from "lucide-react"

import type { Listing } from "@/types/listing"
import { formatCurrency } from "@/lib/format-currency"
import { formatMinimumStay } from "@/lib/lease-conditions"
import { formatShareType } from "@/lib/share-types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { ListingImage } from "./listing-image"

interface ListingCardProps {
  listing: Listing
  index?: number
}

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const isPriority = index < 6
  return (
    <Link href={`/listings/${listing.referenceId}`} className="block">
      <Card className="overflow-hidden hover:shadow-md flex flex-col py-0 border-accent hover:border-primary transition-all duration-200">
        {/* Image */}
        <ListingImage listing={listing} priority={isPriority} />

        <CardHeader>
          <CardTitle className="font-bold">
            {formatShareType(listing.shareType)}
          </CardTitle>
          <CardDescription className="font-light">
            {listing.propertyAddress}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow pb-0">
          <Separator />

          {/* Details */}
          <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm">
            <div className="flex items-center">
              <RulerIcon className="size-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-1">Area:</span>
              <span className="font-medium">
                {listing.roomArea} {listing.roomAreaUnit}
              </span>
            </div>
            <div className="flex items-center">
              <BedIcon className="size-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-1">Bedrooms:</span>
              <span className="font-medium">
                {listing.apartmentBedroomCount}
              </span>
            </div>
            <div className="flex items-center">
              <ShowerIcon className="size-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-1">Bathrooms:</span>
              <span className="font-medium">
                {listing.apartmentBathroomCount}
              </span>
            </div>
            <div className="flex items-center">
              <HomeIcon className="size-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-1 truncate">
                Min stay:
              </span>
              <span className="font-medium truncate">
                {formatMinimumStay(listing)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-0">
          <div className="bg-muted w-full px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm border rounded-none px-2 py-1">
                From{" "}
                {new Date(
                  listing.bookingWindow.bookableFrom
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              {listing.discount > 0 && (
                <span className="text-muted-foreground line-through mr-2 text-xs font-bold">
                  {formatCurrency(listing.rentGross, listing.currency)}
                </span>
              )}
              <span className="text-lg font-bold text-secondary">
                {formatCurrency(listing.rentNet, listing.currency)}
              </span>
              <p className="text-xs text-muted-foreground -mt-1">monthly</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
