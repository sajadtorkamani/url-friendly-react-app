import React from 'react'
import { history } from '../main'

const SearchFilters: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const title = searchParams.get('title') || ''

  const filtersApplied = Array.from(searchParams.keys())

  history.listen(({ location, action }) => {
    console.log({ location, action })
  })

  function handleFilterChange(name: string, value: string) {
    // If user removes a filter, let's delete the param from the URL
    if (value === '') {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }

    const newSearchParams =
      searchParams.toString().length > 1 ? `?${searchParams.toString()}` : ''
    const newUrl = `${window.location.origin}${history.location.pathname}${newSearchParams}`

    if (name === 'title') {
      history.replace(newUrl)
    } else {
      history.push(newUrl)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block">
          Job title
        </label>
        <input
          type="text"
          id="title"
          defaultValue={title}
          onChange={(event) => {
            handleFilterChange('title', event.target.value)
          }}
          name="title"
          placeholder="Search by job title"
          className="border border-gray-500 py-1 px-2"
        />
      </div>

      <div>
        <label htmlFor="type" className="mb-1 block">
          Job type
        </label>

        <select
          name="type"
          id="type"
          className="border border-gray-500 px-2 py-1"
          defaultValue={searchParams.get('type') || ''}
          onChange={(event) => {
            handleFilterChange('type', event.target.value)
          }}
        >
          <option value="">Any</option>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="my-3">Filters: {filtersApplied.join(', ')}</div>

      <button className="mt-4 italic text-gray-800">Clear filters</button>
    </div>
  )
}

export default SearchFilters
