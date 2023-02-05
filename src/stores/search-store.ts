import { create } from 'zustand'

interface State {
  filters: {
    title: string
    type: string
    location: string[]
  }
  hasFilters: () => boolean
}

type Filters = State['filters']

interface Actions {
  updateFilter: (key: keyof Filters, value: Filters[keyof Filters]) => void
  clearFilters: () => void
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
      },

      clearFilters: () => {
        set((state) => ({
          ...state,
          filters: { title: '', type: '', location: [] },
        }))
      },
    },
  }
})

export const useFilters = () => useSearchStore((state) => state.filters)

export const useHasFilters = () => useSearchStore((state) => state.hasFilters())

export const useActions = () => useSearchStore((state) => state.actions)
