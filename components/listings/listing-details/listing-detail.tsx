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

interface PropertyStatProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

interface PropertyDetailItemProps {
  label: string
  value: React.ReactNode
}

interface LeaseConditionItemProps {
  label: string
  value: React.ReactNode
}

interface PriceDisplayProps {
  rentNet: number
  rentGross: number
  currency: string
  discount: number
}

interface AvailabilityInfoProps {
  bookingWindow: {
    bookableFrom: string
    bookableTo: string
  }
}

interface FeeItemProps {
  name: string
  amount: number
  currency: string
}

interface PropertyDetailsSummaryProps {
  listing: Listing
}

// Utility functions
const getEnglishDescription = (
  descriptions: Array<{ language: string; description: string }> = []
): string => {
  const englishDesc = descriptions.find((desc) => desc.language === "en")
  return englishDesc?.description || "No description available"
}

const hasLeaseConditions = (listing: Listing): boolean => {
  return !!(
    listing.leaseConditions &&
    (listing.leaseConditions.minimumStay ||
      listing.leaseConditions.maximumStay ||
      listing.leaseConditions.noticePeriod)
  )
}

const BackButton = () => (
  <div>
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="mb-2 md:mb-4 text-sm md:text-base"
    >
      <Link href="/listings">
        <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
        Back to listings
      </Link>
    </Button>
  </div>
)

const ListingHeader = ({ listing }: { listing: Listing }) => (
  <div>
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
      {formatShareType(listing.shareType)} in {listing.city}
    </h1>
    <div className="flex items-center text-muted-foreground text-xs md:text-base">
      <MapPinIcon className="size-4 mr-1" />
      <span>{listing.propertyAddress}</span>
    </div>
  </div>
)

const PropertyStat = ({ icon, label, value }: PropertyStatProps) => (
  <div className="flex flex-col items-center p-2 md:p-4 bg-muted rounded-lg">
    <div className="h-4 w-4 md:h-5 md:w-5 mb-1 md:mb-2 text-muted-foreground">
      {icon}
    </div>
    <span className="text-xs md:text-sm text-muted-foreground">{label}</span>
    <span className="font-medium text-sm md:text-base">{value}</span>
  </div>
)

const PropertyStats = ({ listing }: { listing: Listing }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-3 md:mt-6">
    <PropertyStat
      icon={<RulerIcon className="h-full w-full" />}
      label="Room Area"
      value={`${listing.roomArea} ${listing.roomAreaUnit}`}
    />
    <PropertyStat
      icon={<BedIcon className="h-full w-full" />}
      label="Bedrooms"
      value={listing.apartmentBedroomCount}
    />
    <PropertyStat
      icon={<ShowerIcon className="h-full w-full" />}
      label="Bathrooms"
      value={listing.apartmentBathroomCount}
    />
    <PropertyStat
      icon={<HomeIcon className="h-full w-full" />}
      label="Min Stay"
      value={formatMinimumStay(listing)}
    />
  </div>
)

const PropertyDescription = ({
  descriptions,
}: {
  descriptions: Array<{ language: string; description: string }>
}) => (
  <div>
    <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
      About this space
    </h2>

    <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line">
      {getEnglishDescription(descriptions)}
    </p>
  </div>
)

const PropertyDetailItem = ({ label, value }: PropertyDetailItemProps) => (
  <div className="flex items-start gap-x-2">
    <span className="text-muted-foreground font-medium">{label}</span>
    <span>{value}</span>
  </div>
)

const ApartmentDetails = ({ listing }: { listing: Listing }) => (
  <div>
    <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
      Apartment Details
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
      <PropertyDetailItem
        label="Apartment Name:"
        value={listing.apartmentName || "N/A"}
      />
      <PropertyDetailItem
        label="Floor:"
        value={listing.apartmentFloor || "N/A"}
      />
      <PropertyDetailItem
        label="Apartment Area:"
        value={`${listing.apartmentArea} ${listing.apartmentAreaUnit}`}
      />
      <PropertyDetailItem label="Property:" value={listing.propertyName} />
    </div>
  </div>
)

const LeaseConditionItem = ({ label, value }: LeaseConditionItemProps) => (
  <div className="flex items-start gap-x-2">
    <span className="text-muted-foreground font-medium">{label}</span>
    <span>{value}</span>
  </div>
)

const LeaseConditions = ({ listing }: { listing: Listing }) => {
  if (!hasLeaseConditions(listing)) return null

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
        Lease Conditions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
        {listing.leaseConditions.minimumStay && (
          <LeaseConditionItem
            label="Minimum Stay:"
            value={formatMinimumStay(listing)}
          />
        )}

        {listing.leaseConditions.maximumStay && (
          <LeaseConditionItem
            label="Maximum Stay:"
            value={`${listing.leaseConditions.maximumStay.amount} ${listing.leaseConditions.maximumStay.unit}`}
          />
        )}

        {listing.leaseConditions.noticePeriod && (
          <LeaseConditionItem
            label="Notice Period:"
            value={`${listing.leaseConditions.noticePeriod.amount} ${listing.leaseConditions.noticePeriod.unit}`}
          />
        )}
      </div>
    </div>
  )
}

const OverviewTab = ({ listing }: { listing: Listing }) => (
  <div className="space-y-4 md:space-y-6">
    <PropertyStats listing={listing} />
    <Separator />
    <PropertyDescription descriptions={listing.roomDescriptions} />
    <ApartmentDetails listing={listing} />
    {hasLeaseConditions(listing) && <LeaseConditions listing={listing} />}
  </div>
)

const PriceDisplay = ({
  rentNet,
  rentGross,
  currency,
  discount,
}: PriceDisplayProps) => (
  <div>
    <p className="text-xl md:text-2xl font-bold">
      {formatCurrency(rentNet, currency)}
      <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
        / month
      </span>
    </p>
    {discount > 0 && (
      <p className="text-xs md:text-sm text-muted-foreground line-through">
        {formatCurrency(rentGross, currency)}
      </p>
    )}
  </div>
)

const AvailabilityInfo = ({ bookingWindow }: AvailabilityInfoProps) => (
  <div className="mb-4 md:mb-6">
    <div className="flex items-center mb-1 md:mb-2">
      <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-muted-foreground" />
      <h3 className="font-medium text-sm md:text-base">Availability</h3>
    </div>
    <p className="text-xs md:text-sm">
      Available from{" "}
      <span className="font-medium">
        {formatAvailableDate(bookingWindow.bookableFrom)}
      </span>
    </p>
    <p className="text-xs md:text-sm">
      Available until{" "}
      <span className="font-medium">
        {formatAvailableDate(bookingWindow.bookableTo)}
      </span>
    </p>
  </div>
)

const FeeItem = ({ name, amount, currency }: FeeItemProps) => (
  <li className="flex justify-between text-xs md:text-sm">
    <span className="text-muted-foreground">{name}</span>
    <span>{formatCurrency(amount, currency)}</span>
  </li>
)

const FeesSection = ({
  fees,
  currency,
}: {
  fees: Array<{ name: string; amount: number }>
  currency: string
}) => {
  if (fees.length === 0) return null

  return (
    <div className="mb-4 md:mb-6">
      <h3 className="font-medium text-sm md:text-base mb-1 md:mb-2">
        Additional Fees
      </h3>
      <ul className="space-y-1 md:space-y-2">
        {fees.map((fee, index) => (
          <FeeItem
            key={index}
            name={fee.name}
            amount={fee.amount}
            currency={currency}
          />
        ))}
      </ul>
    </div>
  )
}

const PropertyDetailsSummary = ({ listing }: PropertyDetailsSummaryProps) => (
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
        <span>{formatCurrency(listing.deposit, listing.currency)}</span>
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
)

const ContactButton = ({ referenceId }: { referenceId: string }) => (
  <div className="mt-4 md:mt-6">
    <Button className="w-full text-sm md:text-base" asChild>
      <Link
        href={`mailto:contact@habyt.com?subject=Inquiry about ${referenceId}`}
      >
        Contact About This Property
      </Link>
    </Button>
  </div>
)

const ListingSummaryCard = ({ listing }: { listing: Listing }) => (
  <Card className="sticky top-4 md:top-8">
    <CardContent>
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <PriceDisplay
          rentNet={listing.rentNet}
          rentGross={listing.rentGross}
          currency={listing.currency}
          discount={listing.discount}
        />
        <Badge variant="secondary" className="text-xs">
          {listing.bookable ? "Available" : "Not Available"}
        </Badge>
      </div>

      <Separator className="mb-4 md:mb-6" />

      <AvailabilityInfo bookingWindow={listing.bookingWindow} />

      <FeesSection fees={listing.fees} currency={listing.currency} />

      {listing.fees.length > 0 && <Separator className="mb-4 md:mb-6" />}

      <PropertyDetailsSummary listing={listing} />

      <ContactButton referenceId={listing.referenceId} />
    </CardContent>
  </Card>
)

// Main component
export function ListingDetail({ listing }: ListingDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
      {/* Left column - Listing details */}
      <div className="lg:col-span-2 space-y-4 md:space-y-8">
        <BackButton />
        <ListingHeader listing={listing} />
        <ImageGallery listing={listing} />

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full text-xs sm:text-sm md:text-base">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab listing={listing} />
          </TabsContent>

          <TabsContent value="amenities">
            <ListingAmenities listing={listing} />
          </TabsContent>

          <TabsContent value="location">
            <ListingMap listing={listing} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right column - Listing summary */}
      <div className="lg:col-span-1 mt-4 lg:mt-0">
        <ListingSummaryCard listing={listing} />
      </div>
    </div>
  )
}
