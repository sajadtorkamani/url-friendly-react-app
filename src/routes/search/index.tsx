import React from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import { getJobs } from '../../lib/jobs'
import { selectSearchFilters } from '../../store/slices/searchSlice'
import { useAppSelector } from '../../hooks/app'

const SearchPage: React.FC = () => {
  const filters = useAppSelector(selectSearchFilters)

  const {
    isLoading,
    isError,
    error,
    data: jobs,
  } = useQuery({
    queryKey: ['jobs', { filters }],
    queryFn: () => getJobs(filters),
    keepPreviousData: true,
  })

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
