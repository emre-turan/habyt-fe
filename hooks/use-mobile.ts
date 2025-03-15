"use client"

import { useEffect, useState } from "react"

/**
 * A React hook that detects if the current viewport width is below a specified breakpoint.
 *
 * @param {number} [breakpoint=768] - The width threshold in pixels to determine mobile view.
 * Defaults to 768px which is a common tablet/mobile breakpoint.
 *
 * @returns {boolean} Returns true if viewport width is less than the breakpoint, false otherwise.
 *
 * @example
 * // Basic usage with default breakpoint (768px)
 * const isMobile = useMobile();
 *
 * @example
 * // Custom breakpoint of 640px
 * const isMobile = useMobile(640);
 *
 * @remarks
 * - Uses window.innerWidth to detect viewport size
 * - Automatically updates on window resize
 * - Cleans up event listener on unmount
 * - SSR safe by using useEffect for browser API access
 */

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < breakpoint)

    // Add event listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}
