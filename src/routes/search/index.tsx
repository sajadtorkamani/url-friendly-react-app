import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import {
  useActions,
  useFilters,
  SearchFilters as SearchFiltersType,
} from '../../stores/search-store'
import { getJobs } from '../../lib/jobs'
import { debounce } from 'lodash'
import { useDebounce } from "use-debounce";

const SearchPage: React.FC = () => {
  const filters = useFilters()
  const debouncedTitle = useDebounce(filters.title, 400)
  const { initializeFiltersFromUrl } = useActions()

  const {
    isLoading,
    isError,
    error,
    data: jobs,
  } = useQuery({
    queryKey: [
      'jobs',
      {
        title: debouncedTitle,
        location: filters.location,
        type: filters.type,
      },
    ],
    queryFn: () => getJobs(filters),
    keepPreviousData: true,
  })

  useEffect(() => {
    window.addEventListener('popstate', function handleNavigation() {
      // This event handler will be called when the presses the browser's back
      // or forward button.
      // We need to update the filters in the store to match the URL search params.
      initializeFiltersFromUrl()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    })
  }, [])

  if (isError) {
    throw error
  }

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="md:w-lg mb-5 border border-gray-300 p-4 md:mb-0">
        <SearchFilters />
      </aside>

      <SearchResults results={jobs || []} isLoading={isLoading} />
    </div>
  )
}

export default SearchPage
