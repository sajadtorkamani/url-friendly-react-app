import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ObjectMap } from '../../types'
import { RootState } from '../index'

interface SearchState {
  filters: SearchFilters
}

export type SearchFilters = {
  title: string
  type: string
  location: string[]
}

export const SEARCH_FILTERS: ObjectMap<SearchFilters> = {
  title: 'title',
  type: 'type',
  location: 'location',
}

const initialState: SearchState = {
  filters: {
    title: '',
    type: '',
    location: [],
  },
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initializeFromUrl: (state) => {
      const queryParams = new URLSearchParams(window.location.search)

      // Handle title
      if (queryParams.has(SEARCH_FILTERS.title)) {
        const title = queryParams.get(SEARCH_FILTERS.title)

        if (title) {
          state.filters.title = title
        }
      }

      // Handle job type
      if (queryParams.has(SEARCH_FILTERS.type)) {
        const type = queryParams.get(SEARCH_FILTERS.type)

        if (type) {
          state.filters.type = type
        }
      }

      // Handle job location
      if (queryParams.has(SEARCH_FILTERS.location)) {
        const location = (queryParams.get(SEARCH_FILTERS.location) || '').split(
          ','
        )

        if (location.length > 0) {
          state.filters.location = location
        }
      }
    },

    updateFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      }
    },

    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const selectSearch = (state: RootState) => state.search

export const selectSearchFilters = createSelector(
  selectSearch,
  (search) => search.filters
)

export const selectHasFilters = createSelector(
  selectSearchFilters,
  (searchFilters) => {
    return Object.values(searchFilters).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }

      return !!value
    })
  }
)

export function syncSearchSliceWithUrl(state: SearchState) {
  const filters = state.filters
  const queryParams = new URLSearchParams(window.location.search)

  // Handle title
  if (filters.title) {
    queryParams.set(SEARCH_FILTERS.title, filters.title)
  }

  // Handle type
  if (filters.type) {
    queryParams.set(SEARCH_FILTERS.type, filters.type)
  }

  // Handle location
  if (filters.location.length > 0) {
    queryParams.set(SEARCH_FILTERS.location, filters.location.join(','))
  }

  const url = new URL(window.location.href)
  url.search = queryParams.toString()

  // Update the current URL
  history.pushState({}, '', url.toString())
}

export const { initializeFromUrl, updateFilters, clearFilters } =
  searchSlice.actions

export const searchReducer = searchSlice.reducer
