import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const Root: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <main className="mx-auto max-w-2xl">
      <nav className="pt-4 pb-8">
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

export default Root
