import React from 'react'
import SearchPage from './routes/search'
import { Link, Outlet } from 'react-router-dom'

const Root: React.FC = () => (
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
  </main>
)

export default Root
