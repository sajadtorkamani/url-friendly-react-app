import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  useActions,
  useFilters,
  useHasFilters,
} from '../../../stores/search-store'

const SearchFilters: React.FC = () => {
  const [, setSearchParams] = useSearchParams()
  const filters = useFilters()
  const hasFilters = useHasFilters()
  const { updateFilter, clearFilters } = useActions()

  useEffect(
    function updateSearchParams() {
      const searchParams = new URLSearchParams()

      Object.entries(filters).forEach(([key, value]) => {
        // Handle empty values
        if (value === '') {
          searchParams.delete(key)
          return
        }

        // Handle multiple values
        if (Array.isArray(value)) {
          searchParams.delete(key) // Delete all values and rebuild in next line
          value.forEach((arrayValue) => searchParams.append(key, arrayValue))
          return
        }

        // Handle scalar values
        searchParams.set(key, value)
      })

      setSearchParams(searchParams)
    },
    [filters]
  )

  useEffect(
    function searchJobs() {
      if (!hasFilters) return

      console.log({ hasFilters })

      console.log("Let's search for some jobs...")
    },
    [filters]
  )

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block">
          Job title
        </label>

        <input
          type="text"
          className="border border-gray-500 py-1 px-2"
          id="title"
          name="title"
          value={filters.title}
          onChange={(event) => {
            updateFilter('title', event.target.value)
          }}
          placeholder="Search by job title"
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
    </div>
  )
}

export default SearchFilters
