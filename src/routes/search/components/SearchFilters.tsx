import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/app'
import {
  clearFilters,
  selectHasFilters,
  selectSearchFilters,
  updateFilters,
} from '../../../store/slices/searchSlice'

const SearchFilters: React.FC = () => {
  const filters = useAppSelector(selectSearchFilters)
  const [searchParams, setSearchParams] = useSearchParams()
  const hasFilters = useAppSelector(selectHasFilters)
  const dispatch = useAppDispatch()
  const jobTitleInputRef = useRef<HTMLInputElement | null>(null)
  //
  // // Initialize state from URL on load
  // useEffect(() => {
  //   searchParams.forEach((value, key) => {
  //     dispatch(updateFilters({ [key]: value }))
  //   })
  // }, [dispatch])

  function handleClearFilters() {
    dispatch(clearFilters())

    searchParams.delete('title')
    searchParams.delete('type')
    searchParams.delete('location')
    setSearchParams(searchParams)

    if (jobTitleInputRef.current) {
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
          value={filters.title}
          onChange={(event) => {
            const value = event.target.value

            dispatch(updateFilters({ title: value }))

            searchParams.set('title', value)
            setSearchParams(searchParams)
          }}
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
            const value = event.target.value

            dispatch(updateFilters({ type: value }))

            searchParams.set('type', value)
            setSearchParams(searchParams)
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

            dispatch(updateFilters({ location: selectedValues }))
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
          className="d-flex mt-4 text-blue-800"
          onClick={() => handleClearFilters()}
        >
          <span className="mr-2">✕</span>
          Clear filters
        </button>
      )}
    </section>
  )
}

export default SearchFilters
