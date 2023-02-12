import React, { useEffect } from 'react'
import {
  useActions,
  useFilters,
  useHasFilters,
} from '../../../stores/search-store'

const SearchFilters: React.FC = () => {
  const filters = useFilters()
  const hasFilters = useHasFilters()
  const { updateFilter, initialiseFilters, clearFilters } = useActions()

  useEffect(() => {
    window.addEventListener('popstate', function handleNavigation() {
      // User has pressed back or forward button
      // We need to update the filters in the store
      // window.history.go()
      initialiseFilters()
      console.log(`window.popstate invoked`)

    })
  }, [])

  return (
    <section>
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block">
          Job title
        </label>

        <input
          autoFocus
          type="text"
          className="min-w-[230px] border border-gray-500 py-1 px-2"
          id="title"
          name="title"
          value={filters.title}
          onChange={(event) => {
            updateFilter('title', event.target.value)
          }}
          placeholder="e.g., Frontend developer"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="mb-1 block">
          Job type
        </label>

        <select
          name="type"
          className="border border-gray-500 px-2 py-1"
          value={filters.type}
          id="type"
          onChange={(event) => {
            updateFilter('type', event.target.value)
          }}
        >
          <option value="">Any</option>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block">
          Location
        </label>

        <select
          name="location"
          multiple
          className="border border-gray-500 px-2 py-1"
          value={filters.location}
          id="location"
          onChange={(event) => {
            const selectedValues = [...event.target.options]
              .filter((option) => option.selected)
              .map((option) => option.value)

            updateFilter('location', selectedValues)
          }}
        >
          <option value="london">London</option>
          <option value="manchester">Manchester</option>
          <option value="birmingham">Birmingham</option>
          <option value="leeds">Leeds</option>
        </select>
      </div>

      {hasFilters && (
        <button
          className="d-flex mt-4 text-gray-800 text-blue-800"
          onClick={() => clearFilters()}
        >
          <span className="mr-2">✕</span>
          Clear filters
        </button>
      )}
    </section>
  )
}

export default SearchFilters
