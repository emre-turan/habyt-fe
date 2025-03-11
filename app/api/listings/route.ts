import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { APIResponse } from '@/app/types/listing';

export async function GET(request: NextRequest) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: APIResponse = JSON.parse(fileContents);
    
    // Get URL search parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    
    // Filter parameters based on OpenAPI spec
    const page = parseInt(searchParams.get('page') || '0');
    const pageSize = parseInt(searchParams.get('pageSize') || '100');
    const bookable = searchParams.get('bookable');
    const bookableOn = searchParams.get('bookableOn');
    const bookableFrom = searchParams.get('bookableFrom');
    const bookableTo = searchParams.get('bookableTo');
    const referenceId = searchParams.get('referenceId');
    const countryCodes = searchParams.getAll('countryCode');
    const cities = searchParams.getAll('city');
    const shareTypes = searchParams.getAll('shareType');
    const postalCode = searchParams.get('postalCode');
    const bedroomsFrom = searchParams.get('bedroomsFrom') ? parseInt(searchParams.get('bedroomsFrom')!) : null;
    const bedroomsTo = searchParams.get('bedroomsTo') ? parseInt(searchParams.get('bedroomsTo')!) : null;
    const rentFrom = searchParams.get('rentFrom') ? parseFloat(searchParams.get('rentFrom')!) : null;
    const rentTo = searchParams.get('rentTo') ? parseFloat(searchParams.get('rentTo')!) : null;
    
    // Apply filters to the data
    let filteredData = [...data.data];
    
    if (bookable === 'true') {
      filteredData = filteredData.filter(listing => listing.bookable);
    } else if (bookable === 'false') {
      filteredData = filteredData.filter(listing => !listing.bookable);
    }
    
    if (bookableOn) {
      filteredData = filteredData.filter(listing => {
        const bookableDate = new Date(bookableOn);
        const from = new Date(listing.bookingWindow.bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        return bookableDate >= from && bookableDate <= to;
      });
    }
    
    if (bookableFrom) {
      filteredData = filteredData.filter(listing => {
        const date = new Date(bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        return date <= to;
      });
    }
    
    if (bookableTo) {
      filteredData = filteredData.filter(listing => {
        const date = new Date(bookableTo);
        const from = new Date(listing.bookingWindow.bookableFrom);
        return date >= from;
      });
    }
    
    if (referenceId) {
      filteredData = filteredData.filter(listing => listing.referenceId === referenceId);
    }
    
    if (countryCodes.length > 0) {
      filteredData = filteredData.filter(listing => countryCodes.includes(listing.countryCode));
    }
    
    if (cities.length > 0) {
      filteredData = filteredData.filter(listing => cities.includes(listing.city));
    }
    
    if (shareTypes.length > 0) {
      filteredData = filteredData.filter(listing => shareTypes.includes(listing.shareType));
    }
    
    if (postalCode) {
      filteredData = filteredData.filter(listing => listing.propertyPostalCode === postalCode);
    }
    
    if (bedroomsFrom !== null) {
      filteredData = filteredData.filter(listing => listing.apartmentBedroomCount >= bedroomsFrom);
    }
    
    if (bedroomsTo !== null) {
      filteredData = filteredData.filter(listing => listing.apartmentBedroomCount <= bedroomsTo);
    }
    
    if (rentFrom !== null) {
      filteredData = filteredData.filter(listing => listing.rentNet >= rentFrom);
    }
    
    if (rentTo !== null) {
      filteredData = filteredData.filter(listing => listing.rentNet <= rentTo);
    }
    
    // Apply pagination
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Build response with metadata and paginated data
    const response: APIResponse = {
      metadata: {
        pagination: {
          currentPage: page,
          currentPageSize: paginatedData.length,
          totalPages: Math.ceil(filteredData.length / pageSize),
          hasNextPage: endIndex < filteredData.length,
          hasPrevPage: page > 0
        },
        filters: referenceId ? { referenceId } : {}
      },
      data: paginatedData
    };
    
    // Return the filtered data as JSON
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching listings data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings data' },
      { status: 500 }
    );
  }
} 