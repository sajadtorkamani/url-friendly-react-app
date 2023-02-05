import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import { useHasFilters, useSearchStore } from '../../stores/search-store'
import { getJobs } from '../../jobs'

export async function loader() {
  const filters = useSearchStore.getState().filters
  const hasFilters = useSearchStore.getState().hasFilters()
  const jobs = hasFilters ? await getJobs(filters) : []

  return { jobs }
}

type LoaderData = Awaited<ReturnType<typeof loader>>

const SearchPage: React.FC = () => {
  const { jobs } = useLoaderData() as LoaderData
  const hasFilters = useHasFilters()

  return (
    <>
      <SearchFilters />
      {hasFilters && <SearchResults results={jobs} />}
    </>
  )
}

export default SearchPage
