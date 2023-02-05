import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Search from './routes/search'
import About from './routes/about'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        index: true,
        element: <Search />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
