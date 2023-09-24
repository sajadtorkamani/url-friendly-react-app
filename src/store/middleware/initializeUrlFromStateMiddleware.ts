import { Middleware } from '@reduxjs/toolkit'
import { initializeFromUrl } from '../slices/searchSlice'

const initializeUrlFromStateMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    if (action.type === 'filters/initializeUrlFromState') {
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

export default initializeUrlFromStateMiddleware
