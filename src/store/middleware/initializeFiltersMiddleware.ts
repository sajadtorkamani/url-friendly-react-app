import { Middleware } from '@reduxjs/toolkit'

const initFromUrlMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'filters/initFromUrl') {
    console.log(storeAPI)
  }
  next(action)
}

export default initFromUrlMiddleware
