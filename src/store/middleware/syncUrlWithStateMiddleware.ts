import { Middleware } from '@reduxjs/toolkit'
import { syncSearchSliceWithUrl } from '../slices/searchSlice'
import { MIDDLEWARE_ACTIONS } from '../../lib/constants'

const syncUrlWithStateMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const state = storeAPI.getState()

    if (action.type === MIDDLEWARE_ACTIONS.syncUrlWithState) {
      switch (window.location.pathname) {
        case '/': {
          syncSearchSliceWithUrl(state.search)
          break
        }
        default:
          // Do nothing
          break
      }
    }

    next(action)
  }

export default syncUrlWithStateMiddleware
