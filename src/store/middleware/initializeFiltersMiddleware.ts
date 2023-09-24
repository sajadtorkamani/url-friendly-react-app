import { Middleware } from '@reduxjs/toolkit'
import { initializeFromUrl } from '../slices/searchSlice'

const initFromUrlMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'filters/initFromUrl') {
    switch (window.location.pathname) {
      case '/': {
        storeAPI.dispatch(initializeFromUrl())
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
