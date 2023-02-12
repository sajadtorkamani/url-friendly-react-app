import React, { useRef } from 'react'
import { debounce } from 'lodash'
import {
  useActions,
  useFilters,
  useHasFilters,
} from '../../../stores/search-store'

const SearchFilters: React.FC = () => {
  const filters = useFilters()
  const hasFilters = useHasFilters()
  const { updateFilter, clearFilters } = useActions()
  const jobTitleInputRef = useRef<HTMLInputElement | null>(null)

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateFilter('title', event.target.value)
  }

  function handleClearFilters() {
    clearFilters()

    if (jobTitleInputRef.current) {
      jobTitleInputRef.current.value = ''
      jobTitleInputRef.current.focus()
    }
  }

  return (
    <section>
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block">
          Job title
        </label>

        <input
          ref={jobTitleInputRef}
          autoFocus
          type="text"
          className="w-full min-w-[230px] border border-gray-500 py-1 px-2"
          id="title"
          name="title"
          defaultValue={filters.title}
          onChange={debounce(handleTitleChange, 300)}
          placeholder="e.g., Ruby ninja"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="mb-1 block">
          Job type
        </label>

        <select
          name="type"
          className="w-full border border-gray-500 px-2 py-1"
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
          className="w-full border border-gray-500 px-2 py-1"
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
          onClick={handleClearFilters}
        >
          <span className="mr-2">✕</span>
          Clear filters
        </button>
      )}
    </section>
  )
}

export default SearchFilters
