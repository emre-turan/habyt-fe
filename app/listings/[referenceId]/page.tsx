import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"

import type { APIResponse, Listing } from "@/types/listing"
import { getMainImage } from "@/lib/listing-images"
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

/**
 * Get the English description from a listing's room descriptions
 * @param listing - The listing object
 * @returns The English description or a fallback message
 */
function getEnglishDescription(listing: Listing): string {
  const englishDesc = listing.roomDescriptions?.find(
    (desc) => desc.language === "EN"
  )?.description

  if (englishDesc) return englishDesc

  return `${listing.shareType} in ${listing.city} available for rent.`
}

/**
 * Generate metadata for the listing page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ referenceId: string }>
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await params
  const listing = await getListingByReferenceId(resolvedParams.referenceId)

  // Return default metadata if listing not found
  if (!listing) {
    return {
      title: "Listing Not Found | Habyt",
      description: "The requested listing could not be found.",
    }
  }

  // Generate metadata from the listing
  return {
    title: `${listing.propertyName} in ${listing.city} | Habyt`,
    description: getEnglishDescription(listing),
    openGraph: {
      images: [getMainImage(listing)],
    },
  }
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ referenceId: string }>
}) {
  const resolvedParams = await params
  const listing = await getListingByReferenceId(resolvedParams.referenceId)

  if (!listing) {
    notFound()
  }

  return (
    <Container className="py-8">
      <ListingDetail listing={listing} />
    </Container>
  )
}
