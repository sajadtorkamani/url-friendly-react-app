import { Middleware } from '@reduxjs/toolkit'
import { updateFilters } from '../slices/searchSlice'

const initFromUrlMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'filters/initFromUrl') {
    switch (window.location.pathname) {
      case '/': {
        const queryParams = new URLSearchParams(window.location.search)

        queryParams.forEach((value, key) => {
          storeAPI.dispatch(updateFilters({ [key]: value }))
          console.log({ key, value })
        })

        break
      }
      default:
        // Do nothing
        break
    }
  }
  next(action)
}

export default initFromUrlMiddleware
