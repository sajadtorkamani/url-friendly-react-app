import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import './index.css'
import SearchPage from './routes/search'
import AboutPage from './routes/about'

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
  <RouterProvider router={router} />
)
