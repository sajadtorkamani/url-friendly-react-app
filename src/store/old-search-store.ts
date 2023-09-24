import { updateSearchParams } from '../lib/update-search-params'
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

const INITIAL_FILTERS: SearchFilters = {
  title: '',
  type: '',
  location: [],
}

interface Actions {
  updateFilter: (
    key: keyof SearchFilters,
    value: SearchFilters[keyof SearchFilters]
  ) => void
  clearFilters: () => void
  initializeFiltersFromUrl: () => void
}

type Store = State & { actions: Actions }

export const useSearchStore = create<Store>((set, get) => {
  const searchParams = new URLSearchParams(window.location.search)

  return {
    filters: {
      title: searchParams.get('title') || INITIAL_FILTERS.title,
      type: searchParams.get('type') || INITIAL_FILTERS.type,
      location: searchParams.getAll('location') || INITIAL_FILTERS.location,
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

        // Could probably debounce the updateSearchParams call if updating the
        // job title filter.
        const newSearchParamsString = updateSearchParams(key, value)

        // Push new entry into the session history with updated search params
        window.history.pushState({}, '', `?${newSearchParamsString}`)
      },

      clearFilters: () => {
        set((state) => ({
          ...state,
          filters: { title: '', type: '', location: [] },
        }))

        window.history.pushState({}, '', `?`)
      },

      // Initialise filters from URL search params
      initializeFiltersFromUrl: () => {
        const searchParams = new URLSearchParams(window.location.search)
        set((state) => ({
          ...state,
          filters: {
            title: searchParams.get('title') || INITIAL_FILTERS.title,
            type: searchParams.get('type') || INITIAL_FILTERS.type,
            location:
              searchParams.getAll('location') || INITIAL_FILTERS.location,
          },
        }))
      },
    },
  }
})

export const useFilters = () => useSearchStore((state) => state.filters)
export const useHasFilters = () => useSearchStore((state) => state.hasFilters())
export const useActions = () => useSearchStore((state) => state.actions)
