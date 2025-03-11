export interface Listing {
  referenceId: string
  bookable: boolean
  shareType: "PrivateApartment" | "Studio" | "PrivateRoom" | "SharedRoom"
  currency: string
  rentGross: number
  rentNet: number
  discount: number
  discountDescription?: string | null
  deposit: number
  city: string
  cityTimezone: string
  countryName: string
  countryCode: string
  matterportUrl?: string | null
  bookingWindow: {
    bookableFrom: string
    bookableTo: string
  }
  fees: Array<{
    name: string
    description: string
    amount: number
  }>
  leaseConditions: {
    noticePeriod: {
      amount: number
      unit: "Months" | "Days"
      type: "Any" | "MiddleOrEnd" | "End"
    }
    minimumStay: TimeUnit
    maximumStay: TimeUnit
  }
  roomArea: number
  roomAreaUnit: "Sqm" | "Sqft"
  roomAmenities: string[]
  roomDescriptions: Array<{
    language: string
    description: string
  }>
  roomImages: Array<{
    url: string
    size: number
  }>
  apartmentName: string
  apartmentFloor: string
  apartmentBedroomCount: number
  apartmentBathroomCount: number
  apartmentArea: number
  apartmentAreaUnit: "Sqm" | "Sqft"
  apartmentAmenities: string[]
  apartmentDescriptions: Array<{
    language: string
    description: string
  }>
  apartmentImages: Array<{
    url: string
    size: number
  }>
  propertyName: string
  propertyAddress: string
  propertyStreet: string
  propertyPostalCode: string
  propertyLatitude: number
  propertyLongitude: number
  propertyAmenities: string[]
  propertyDescriptions: Array<{
    language: string
    description: string
  }>
  propertyImages: Array<{
    url: string
    size: number
  }>
}

export interface TimeUnit {
  amount: number
  unit: "Months" | "Days"
}

export interface APIResponse {
  metadata: {
    pagination: {
      currentPage: number
      currentPageSize: number
      totalPages: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
    filters?: {
      referenceId?: string
    }
  }
  data: Listing[]
}
