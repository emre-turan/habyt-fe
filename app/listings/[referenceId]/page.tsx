import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"

import type { APIResponse, Listing } from "@/types/listing"
import { Container } from "@/components/ui/container"
import { ListingDetail } from "@/components/listings/listing-details/listing-detail"

// Function to fetch a specific listing by referenceId
async function getListingByReferenceId(
  referenceId: string
): Promise<Listing | null> {
  try {
    // Read the JSON file directly (same approach as in the API route)
    const filePath = path.join(process.cwd(), "public", "data.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data: APIResponse = JSON.parse(fileContents)

    // Find the listing with the matching referenceId
    const listing = data.data.find((item) => item.referenceId === referenceId)

    return listing || null
  } catch (error) {
    console.error("Error fetching listing:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { referenceId: string }
}) {
  const listing = await getListingByReferenceId(params.referenceId)

  if (!listing) {
    return {
      title: "Listing Not Found | Habyt",
      description: "The requested listing could not be found.",
    }
  }

  return {
    title: `${listing.propertyName} in ${listing.city} | Habyt`,
    description:
      listing.roomDescriptions?.find((desc) => desc.language === "EN")
        ?.description ||
      `${listing.shareType} in ${listing.city} available for rent.`,
    openGraph: {
      images: [
        listing.propertyImages?.[0]?.url ||
          listing.apartmentImages?.[0]?.url ||
          "",
      ],
    },
  }
}

export default async function ListingPage({
  params,
}: {
  params: { referenceId: string }
}) {
  const listing = await getListingByReferenceId(params.referenceId)

  if (!listing) {
    notFound()
  }

  return (
    <Container className="py-8">
      <ListingDetail listing={listing} />
    </Container>
  )
}
