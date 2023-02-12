import React from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import { useFilters } from '../../stores/search-store'
import { getJobs } from '../../jobs'

const SearchPage: React.FC = () => {
  const filters = useFilters()
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobs(filters),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    throw error
  }

  return (
    <>
      <SearchFilters />
      <SearchResults results={data} />
    </>
  )
}

export default SearchPage
