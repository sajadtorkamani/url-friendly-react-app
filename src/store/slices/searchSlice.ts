import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

interface SearchState {
  filters: SearchFilters
}

export type SearchFilters = {
  title: string
  type: string
  location: string[]
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

      queryParams.forEach((value, key) => {
        // TODO: Validate that passed param pairs are valid
        if (key in state.filters) {
          state.filters[key as keyof SearchFilters] = value
        }
      })
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

export const { initializeFromUrl, updateFilters, clearFilters } =
  searchSlice.actions

export const searchReducer = searchSlice.reducer
