import { create } from 'zustand'

interface State {
  filters: {
    title: string
    type: string
    location: string[]
  }
  hasFilters: () => boolean
}

export type SearchFilters = State['filters']

interface Actions {
  updateFilter: (
    key: keyof SearchFilters,
    value: SearchFilters[keyof SearchFilters]
  ) => void
  clearFilters: () => void
  initialiseFilters: () => void
}

type Store = State & { actions: Actions }

export const useSearchStore = create<Store>((set, get) => {
  const searchParams = new URLSearchParams(window.location.search)

  return {
    filters: {
      title: searchParams.get('title') || '',
      type: searchParams.get('type') || '',
      location: searchParams.getAll('location') || [],
    },

    hasFilters: () => {
      return Object.values(get().filters).some((value) => {
        if (Array.isArray(value)) {
          return value.length > 0
        }

        return !!value
      })
    },

    actions: {
      updateFilter: (key, value) => {
        set((state) => ({
          ...state,
          filters: {
            ...state.filters,
            [key]: value,
          },
        }))

        // Update URL search params
        function buildSearchParams() {
          const searchParams = new URLSearchParams()

          // Handle empty values
          if (value === '') {
            searchParams.delete(key)
            return searchParams
          }

          // Handle multiple values
          if (Array.isArray(value)) {
            searchParams.delete(key) // Delete all values and rebuild in next line
            value.forEach((arrayValue) => searchParams.append(key, arrayValue))
            return searchParams
          }

          // Handle scalar values
          searchParams.set(key, value)
          return searchParams
        }

        const searchParamsString = buildSearchParams().toString()

        // Push new entry into the session history with updated search params
        window.history.pushState({}, '', `?${searchParamsString}`)
      },

      clearFilters: () => {
        set((state) => ({
          ...state,
          filters: { title: '', type: '', location: [] },
        }))

        window.history.pushState({}, '', `?`)
      },

      // Initialise filters from URL search params
      initialiseFilters: () => {
        const searchParams = new URLSearchParams(window.location.search)

        set((state) => ({
          ...state,
          filters: {
            title: searchParams.get('title') || state.filters.title || '',
            type: searchParams.get('type') || state.filters.type || '',
            location:
              searchParams.getAll('location') || state.filters.location || [],
          },
        }))
      },
    },
  }
})

export const useFilters = () => useSearchStore((state) => state.filters)

export const useHasFilters = () => useSearchStore((state) => state.hasFilters())

export const useActions = () => useSearchStore((state) => state.actions)
