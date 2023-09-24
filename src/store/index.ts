import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/searchSlice'
import initializeStateFromUrlMiddleware from './middleware/initializeStateFromUrlMiddleware'
import initializeUrlFromStateMiddleware from './middleware/initializeUrlFromStateMiddleware'

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    initializeStateFromUrlMiddleware,
    initializeUrlFromStateMiddleware,
  ],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
