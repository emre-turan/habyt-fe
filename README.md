# Habyt Frontend Assignment

## 🏠 Overview

I'm thrilled to present my solution for the Habyt frontend assignment! This project has been an exciting opportunity to build a modern, user-friendly property listings interface that helps people find their perfect home.

Working with real estate data has been particularly enjoyable - there's something special about creating interfaces that help people with one of their most important decisions: where to live. The combination of visual elements, practical filtering, and data presentation makes this domain uniquely rewarding to work in.

## ✨ Features Implemented

- **Enhanced Filter UI**: Completely redesigned filter interface with dynamic options
- **Responsive Design**: Fully responsive layout that works beautifully on all devices
- **Detailed Listing View**: Created an immersive detailed view for individual properties
- **Dynamic Filter Options**: Options that update based on available data
- **Loading States**: Smooth loading experiences with skeleton loaders
- **Lazy Loading Images**: Optimized image loading with lazy loading for better performance
- **Client-side Caching**: Optimized performance with strategic data caching
- **Accessibility**: Implemented keyboard navigation and screen reader support

...and more!

## 🛠️ Technical Decisions

### Modern Stack

- **Next.js 15 with Turbo**: Leveraging the latest Next.js features for optimal performance
- **React 19**: Taking advantage of the latest React improvements
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Utility-first styling with the latest Tailwind features and with power of Lightning CSS
- **Bun Package Manager**: Ultra-fast dependency management and script execution

### Architecture & Patterns

- **shadcn/ui Components**: Used for consistent, accessible UI elements that can be fully customized and fully compatible with Tailwind CSS v4
- **TanStack Query**: Implemented for data fetching with sophisticated caching strategies instead of raw useEffect
- **Custom Hooks Architecture**: Created a suite of specialized hooks for clean separation of concerns
- **Modular Code Structure**: Organized by domain with clear component boundaries
- **Comprehensive JSDoc**: Added detailed documentation for all custom hooks and utilities

### Client-side vs Server-side Fetching

I chose to enhance the existing client-side data fetching architecture with TanStack Query rather than completely refactoring to server-side fetching. This decision was based on:

1. The highly interactive nature of the filtering UI, which benefits from client-side data management
2. The ability to implement sophisticated caching and loading states quickly
3. Practical time constraints of the assignment

In a production environment with more time, I would implement a hybrid approach with server components for initial page loads and SEO-critical content, while maintaining client-side fetching for the interactive filtering experience.

## 🚀 Running the Project

```shellscript
# Clone the repository
git clone https://github.com/emre-turan/habyt-fe.git
cd habyt-fe-assignment

# Install dependencies with Bun
bun install

# Start the development server
bun run dev

# Build for production
bun run build

# Start the production server
bun run start
```

## 🔍 Project Structure

```plaintext
habyt-fe/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── listings/         # Listings pages
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── filters/          # Filter components
│   ├── listings/         # Listing components
│   ├── shared/           # Shared components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
│   ├── queries/          # Data fetching hooks
│   └── ...               # Other specialized hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```
