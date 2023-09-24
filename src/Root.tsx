import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useAppDispatch } from './hooks/app'
import { MIDDLEWARE_ACTIONS } from './lib/constants'

const queryClient = new QueryClient()

const Root: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: MIDDLEWARE_ACTIONS.initializeStateFromUrl })
    dispatch({ type: MIDDLEWARE_ACTIONS.syncUrlWithState })
  }, [dispatch, location])

  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto max-w-6xl p-4">
        <nav className="pt-2 pb-6">
          <ul className="flex">
            {[
              { label: 'Search', path: '/' },
              { label: 'About', path: '/about' },
            ].map(({ label, path }) => (
              <li key={path} className="mr-4">
                <Link to={path} className="text-blue-600 underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </main>
    </QueryClientProvider>
  )
}

export default Root
