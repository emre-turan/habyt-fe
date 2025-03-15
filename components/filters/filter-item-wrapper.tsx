interface FilterItemWrapperProps {
  children: React.ReactNode
}

/**
 * Consistent wrapper for filter items with proper spacing and height
 */
export function FilterItemWrapper({ children }: FilterItemWrapperProps) {
  return <div className="space-y-2 h-14">{children}</div>
}
