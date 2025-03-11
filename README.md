# Habyt Frontend Take-Home Assignment

This is a take-home assignment for frontend developer candidates at Habyt. The assignment aims to assess your ability to implement a filter interface for property listings using React and Next.js.

## Getting Started

First, clone this repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assignment Overview

In this assignment, you will be working on a listings page that displays available properties. The page already has a basic structure in place, but your task is to enhance the filtering functionality to match the Habyt design and improve the user experience.

### Existing Features

1. A listings page that displays properties from a mock API
2. Basic filtering functionality including:
   - Filter by city
   - Filter by rent range
   - Filter by move-in date
   - Filter by property type
3. Pagination of results

### Your Tasks

1. **Enhance the Filter UI**: 
   - Improve the visual design of the filter interface based on [Habyt's design principles](https://www.habyt.com)
   - Add additional filters from the API specification (see the OpenAPI spec in `openapi.yml`)
   - Implement dynamic filter options that update based on available data

2. **Improve User Experience**:
   - Add loading states for filters and results
   - Implement client-side caching to minimize API requests
   - Ensure responsive behavior on mobile devices
   - Add clear feedback when no results match filters

3. **Additional Features** (Choose at least 2):
   - Implement a map view of properties using a mapping library
   - Add a "save filters" feature with local storage
   - Create a detailed view for individual listings
   - Add sorting options for results (by price, availability date, etc.)
   - Implement "lazy loading" of listing images for better performance
   - Implement pagination with server-side support (optimize the API route for better performance with large datasets)
   - Add accessibility features for keyboard navigation and screen readers

## Technical Details

### API Endpoint

A mock API endpoint is available at `/api/listings` that returns property data. The endpoint accepts some query parameters for filtering as based upon our current API as documentated in the OpenAPI specification (`openapi.yml`).

Key filter parameters include:
- `city`: Filter by city name
- `rentFrom` and `rentTo`: Filter by rent range
- `bookableOn`: Filter by availability date
- `shareType`: Filter by property type (PrivateApartment, Studio, PrivateRoom, SharedRoom)
- `page` and `pageSize`: For pagination (0-based page index)

### Data Structure

The response from the API follows this structure:

```typescript
{
  metadata: {
    pagination: {
      currentPage: number;
      currentPageSize: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    }
  },
  data: Listing[]
}
```

The `Listing` type is defined in `app/types/listing.ts` and follows the schema in the OpenAPI specification.

## Evaluation Criteria

Your submission will be evaluated based on:

1. **Code Quality**: Well-structured, maintainable code that follows best practices
2. **User Experience**: Intuitive interface with responsive design
3. **Technical Implementation**: Effective use of React hooks, state management, and Next.js features
4. **Visual Design**: Clean, professional UI that aligns with Habyt's design
5. **Performance**: Efficient rendering and data fetching strategies

## Submission

Please submit your solution as a GitHub repository or a compressed archive of your project. Include a brief README explaining your approach, any architectural decisions you made, and instructions for running your solution.

Feel free to add any libraries or tools that you think would help you complete the assignment, but be prepared to explain your choices.

Good luck!
