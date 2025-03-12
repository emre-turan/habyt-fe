export type ShareType =
  | "PrivateApartment"
  | "Studio"
  | "PrivateRoom"
  | "SharedRoom"

export interface ShareTypeOption {
  label: string
  value: ShareType
}

export const SHARE_TYPES: ShareTypeOption[] = [
  { label: "Private Apartment", value: "PrivateApartment" },
  { label: "Studio", value: "Studio" },
  { label: "Private Room", value: "PrivateRoom" },
  { label: "Shared Room", value: "SharedRoom" },
]

/**
 * Converts a share type value to its human-readable label
 * @param shareType - The share type value to format (e.g. "PrivateApartment")
 * @returns The formatted label (e.g. "Private Apartment") or the original value if not found
 */
export function formatShareType(shareType: string): string {
  const option = SHARE_TYPES.find((type) => type.value === shareType)
  return option?.label || shareType
}

/**
 * Returns all share type options for filters, dropdowns, etc.
 * @returns An array of share type options
 */
export function getShareTypeOptions(): ShareTypeOption[] {
  return SHARE_TYPES
}
