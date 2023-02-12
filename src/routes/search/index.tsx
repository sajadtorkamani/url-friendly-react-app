import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import { useActions, useFilters } from '../../stores/search-store'
import { getJobs } from '../../jobs'

const SearchPage: React.FC = () => {
  const filters = useFilters()
  const { initialiseFilterFromUrl } = useActions()

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobs(filters),
    keepPreviousData: true,
  })

  useEffect(() => {
    window.addEventListener('popstate', function handleNavigation() {
      // This event handler will be called when the presses the browser's back
      // or forward button.
      // We need to update the filters in the store to match the URL search params.
      initialiseFilterFromUrl()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    })
  }, [])

  if (isError) {
    throw error
  }

  return (
    <>
      <SearchFilters />
      <SearchResults results={data} isLoading={isLoading} />
    </>
  )
}

export default SearchPage
