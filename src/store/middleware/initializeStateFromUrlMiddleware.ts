import { Middleware } from '@reduxjs/toolkit'
import { initializeFromUrl } from '../slices/searchSlice'
import { MIDDLEWARE_ACTIONS } from '../../lib/constants'

const initializeStateFromUrlMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    if (action.type === MIDDLEWARE_ACTIONS.initializeStateFromUrl) {
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

export default initializeStateFromUrlMiddleware
