export interface FilterState {
  city: string
  rentFrom: string
  rentTo: string
  selectedShareTypes: string[]
  bookableOn: string
  date: Date | undefined
  calendarOpen: boolean
  bedroomsFrom: string
  bedroomsTo: string
}

export interface FilterSetters {
  setCity: (value: string) => void
  setRentFrom: (value: string) => void
  setRentTo: (value: string) => void
  setSelectedShareTypes: (value: string[]) => void
  setBookableOn: (value: string) => void
  setDate: (value: Date | undefined) => void
  setCalendarOpen: (value: boolean) => void
  setBedroomsFrom: (value: string) => void
  setBedroomsTo: (value: string) => void
}

export interface FilterActions {
  handleSelectDate: (date: Date | undefined) => void
  applyFilters: () => void
  resetFilters: () => void
}

export interface FilterHookReturn {
  filters: FilterState
  setters: FilterSetters
  actions: FilterActions
}
