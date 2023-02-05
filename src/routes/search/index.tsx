import React from 'react'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import { getJobs } from '../../jobs'
import { useLoaderData } from 'react-router-dom'
import { useFilters, useSearchStore } from '../../stores/search-store'

export async function loader() {
  const filters = useSearchStore.getState().filters
  const hasFilters = useSearchStore.getState().hasFilters()
  const jobs = hasFilters ? await getJobs(filters) : []

  return { jobs }
}

type LoaderData = Awaited<ReturnType<typeof loader>>

const SearchPage: React.FC = () => {
  const { jobs } = useLoaderData() as LoaderData

  return (
    <>
      <SearchFilters />
      <SearchResults results={jobs} />
    </>
  )
}

export default SearchPage
