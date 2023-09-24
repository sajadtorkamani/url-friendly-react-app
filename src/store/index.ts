import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/searchSlice'
import initFromUrlMiddleware from './middleware/initializeFiltersMiddleware'

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(initFromUrlMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
