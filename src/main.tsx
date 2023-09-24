import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import './index.css'
import SearchPage from './routes/search'
import AboutPage from './routes/about'
import { Provider } from 'react-redux'
import { store } from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        index: true,
        element: <SearchPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
