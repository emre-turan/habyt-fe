"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { OptionSelectFilter } from "./option-select-filter"

// Share types based on the API schema
const shareTypes = [
  { label: "Private Apartment", value: "PrivateApartment" },
  { label: "Studio", value: "Studio" },
  { label: "Private Room", value: "PrivateRoom" },
  { label: "Shared Room", value: "SharedRoom" },
]

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL parameters
  const [city, setCity] = useState<string>(searchParams.get("city") || "")
  const [rentFrom, setRentFrom] = useState<string>(
    searchParams.get("rentFrom") || ""
  )
  const [rentTo, setRentTo] = useState<string>(searchParams.get("rentTo") || "")
  const [selectedShareTypes, setSelectedShareTypes] = useState<string[]>(() => {
    const params = searchParams.getAll("shareType")
    return params.length > 0 ? params : []
  })
  const [bookableOn, setBookableOn] = useState<string>(
    searchParams.get("bookableOn") || ""
  )

  // Fetch unique cities for dropdown
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch("/api/listings")
        if (!response.ok) throw new Error("Failed to fetch listings")
        const data = await response.json()

        // Extract unique cities
        const uniqueCities = Array.from(
          new Set(data.data.map((listing: any) => listing.city))
        ).sort()

        setCities(uniqueCities as string[])
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (city) params.append("city", city)
    if (rentFrom) params.append("rentFrom", rentFrom)
    if (rentTo) params.append("rentTo", rentTo)
    if (bookableOn) params.append("bookableOn", bookableOn)

    // Add all selected share types
    selectedShareTypes.forEach((type) => {
      params.append("shareType", type)
    })

    router.push(`/listings?${params.toString()}`)
  }

  const resetFilters = () => {
    setCity("")
    setRentFrom("")
    setRentTo("")
    setSelectedShareTypes([])
    setBookableOn("")
    router.push("/listings")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* City filter */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Cities</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {/* Price range filter */}
        <div>
          <label
            htmlFor="rentFrom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Monthly Rent
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="rentFrom"
              placeholder="Min"
              value={rentFrom}
              onChange={(e) => setRentFrom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <span>-</span>
            <input
              type="number"
              id="rentTo"
              placeholder="Max"
              value={rentTo}
              onChange={(e) => setRentTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Move-in date filter */}
        <div>
          <label
            htmlFor="bookableOn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Move-in Date
          </label>
          <input
            type="date"
            id="bookableOn"
            value={bookableOn}
            onChange={(e) => setBookableOn(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Property type filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Type
        </label>
        <OptionSelectFilter
          label="Property Type"
          options={shareTypes}
          selectedValues={selectedShareTypes}
          onChange={setSelectedShareTypes}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
