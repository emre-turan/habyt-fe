"use client"

import { useState } from "react"
import Link from "next/link"

import {
  ArrowLeft,
  BedIcon,
  CalendarIcon,
  HomeIcon,
  MapPinIcon,
  RulerIcon,
  ShowerHeadIcon as ShowerIcon,
} from "lucide-react"

import type { Listing } from "@/types/listing"
import { formatCurrency } from "@/lib/format-currency"
import { formatMinimumStay } from "@/lib/lease-conditions"
import { formatShareType } from "@/lib/share-types"
import { formatAvailableDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ImageGallery } from "./image-gallery"
import { ListingAmenities } from "./listing-amenities"
import { ListingMap } from "./listing-map"

interface ListingDetailProps {
  listing: Listing
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Get a description in english if available
  const getDescription = () => {
    const descriptions = [...(listing.roomDescriptions || [])]
    const englishDesc = descriptions.find((desc) => desc.language === "EN")
    return englishDesc?.description || "No description available"
  }

  // Check if lease conditions exist
  const hasLeaseConditions =
    listing.leaseConditions &&
    (listing.leaseConditions.minimumStay ||
      listing.leaseConditions.maximumStay ||
      listing.leaseConditions.noticePeriod)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
      {/* Left column - Listing details */}
      <div className="lg:col-span-2 space-y-4 md:space-y-8">
        {/* Back button */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-2 md:mb-4 text-sm md:text-base"
          >
            <Link href="/listings">
              <ArrowLeft className="mr-1 md:mr-2 size-3 md:size-4" />
              Back to listings
            </Link>
          </Button>
        </div>

        {/* Title and location */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            {formatShareType(listing.shareType)} in {listing.city}
          </h1>
          <div className="flex items-center text-muted-foreground text-xs md:text-base">
            <MapPinIcon className="size-4 mr-1" />
            <span>{listing.propertyAddress}</span>
          </div>
        </div>

        {/* Image gallery */}
        <ImageGallery listing={listing} />

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full text-xs sm:text-sm md:text-base">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-3 md:mt-6">
              <div className="flex flex-col items-center p-2 md:p-4 bg-muted rounded-lg">
                <RulerIcon className="h-4 w-4 md:h-5 md:w-5 mb-1 md:mb-2 text-muted-foreground" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Room Area
                </span>
                <span className="font-medium text-sm md:text-base">
                  {listing.roomArea} {listing.roomAreaUnit}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 md:p-4 bg-muted rounded-lg">
                <BedIcon className="h-4 w-4 md:h-5 md:w-5 mb-1 md:mb-2 text-muted-foreground" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Bedrooms
                </span>
                <span className="font-medium text-sm md:text-base">
                  {listing.apartmentBedroomCount}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 md:p-4 bg-muted rounded-lg">
                <ShowerIcon className="h-4 w-4 md:h-5 md:w-5 mb-1 md:mb-2 text-muted-foreground" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Bathrooms
                </span>
                <span className="font-medium text-sm md:text-base">
                  {listing.apartmentBathroomCount}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 md:p-4 bg-muted rounded-lg">
                <HomeIcon className="h-4 w-4 md:h-5 md:w-5 mb-1 md:mb-2 text-muted-foreground" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Min Stay
                </span>
                <span className="font-medium text-sm md:text-base">
                  {formatMinimumStay(listing)}
                </span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                About this space
              </h2>
              <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line">
                {getDescription()}
              </p>
            </div>

            {/* Apartment details */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                Apartment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                <div className="flex items-center">
                  <span className="text-muted-foreground w-1/2">
                    Apartment Name:
                  </span>
                  <span>{listing.apartmentName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground w-1/2">Floor:</span>
                  <span>{listing.apartmentFloor || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground w-1/2">
                    Apartment Area:
                  </span>
                  <span>
                    {listing.apartmentArea} {listing.apartmentAreaUnit}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground w-1/2">Property:</span>
                  <span>{listing.propertyName}</span>
                </div>
              </div>
            </div>

            {/* Lease conditions */}
            {hasLeaseConditions && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                  Lease Conditions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                  {listing.leaseConditions.minimumStay && (
                    <div className="flex items-center">
                      <span className="text-muted-foreground w-1/2">
                        Minimum Stay:
                      </span>
                      <span>{formatMinimumStay(listing)}</span>
                    </div>
                  )}

                  {listing.leaseConditions.maximumStay && (
                    <div className="flex items-center">
                      <span className="text-muted-foreground w-1/2">
                        Maximum Stay:
                      </span>
                      <span>
                        {listing.leaseConditions.maximumStay.amount}{" "}
                        {listing.leaseConditions.maximumStay.unit}
                      </span>
                    </div>
                  )}

                  {listing.leaseConditions.noticePeriod && (
                    <>
                      <div className="flex items-center">
                        <span className="text-muted-foreground w-1/2">
                          Notice Period:
                        </span>
                        <span>
                          {listing.leaseConditions.noticePeriod.amount}{" "}
                          {listing.leaseConditions.noticePeriod.unit}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Amenities tab */}
          <TabsContent value="amenities">
            <ListingAmenities listing={listing} />
          </TabsContent>

          {/* Location tab */}
          <TabsContent value="location">
            <ListingMap listing={listing} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right column - Listing summary */}
      <div className="lg:col-span-1 mt-4 lg:mt-0">
        <Card className="sticky top-4 md:top-8">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {formatCurrency(listing.rentNet, listing.currency)}
                  <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                    / month
                  </span>
                </p>
                {listing.discount > 0 && (
                  <p className="text-xs md:text-sm text-muted-foreground line-through">
                    {formatCurrency(listing.rentGross, listing.currency)}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {listing.bookable ? "Available" : "Not Available"}
              </Badge>
            </div>

            <Separator className="mb-4 md:mb-6" />

            {/* Availability */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center mb-1 md:mb-2">
                <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-muted-foreground" />
                <h3 className="font-medium text-sm md:text-base">
                  Availability
                </h3>
              </div>
              <p className="text-xs md:text-sm">
                Available from{" "}
                <span className="font-medium">
                  {formatAvailableDate(listing.bookingWindow.bookableFrom)}
                </span>
              </p>
              <p className="text-xs md:text-sm">
                Available until{" "}
                <span className="font-medium">
                  {formatAvailableDate(listing.bookingWindow.bookableTo)}
                </span>
              </p>
            </div>

            {/* Fees */}
            {listing.fees.length > 0 && (
              <div className="mb-4 md:mb-6">
                <h3 className="font-medium text-sm md:text-base mb-1 md:mb-2">
                  Additional Fees
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {listing.fees.map((fee, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-xs md:text-sm"
                    >
                      <span className="text-muted-foreground">{fee.name}</span>
                      <span>
                        {formatCurrency(fee.amount, listing.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="mb-4 md:mb-6" />

            {/* Property details summary */}
            <div>
              <h3 className="font-medium text-sm md:text-base mb-2 md:mb-3">
                Property Details
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Property Type</span>
                  <span>{formatShareType(listing.shareType)}</span>
                </li>
                <li className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Deposit</span>
                  <span>
                    {formatCurrency(listing.deposit, listing.currency)}
                  </span>
                </li>
                <li className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Country</span>
                  <span>{listing.countryName}</span>
                </li>
                <li className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">City</span>
                  <span>{listing.city}</span>
                </li>
                <li className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Postal Code</span>
                  <span>{listing.propertyPostalCode}</span>
                </li>
              </ul>
            </div>

            {/* Contact button */}
            <div className="mt-4 md:mt-6">
              <Button className="w-full text-sm md:text-base" asChild>
                <Link
                  href={`mailto:contact@habyt.com?subject=Inquiry about ${listing.referenceId}`}
                >
                  Contact About This Property
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
