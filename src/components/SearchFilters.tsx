import React from 'react'

const SearchFilters: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const title = searchParams.get('title') || ''

  console.log({ title })

  function handleFilterChange(name: string, value: string) {
    // If user removes a filter, let's delete the param from the URL
    if (value === '') {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }

    const newSearchParams =
      searchParams.toString().length > 1 ? `?${searchParams.toString()}` : ''
    const newUrl = `${window.location.origin}${window.location.pathname}${newSearchParams}`

    if (name === 'title') {
      window.history.replaceState({}, '', newUrl)
    } else {
      window.history.pushState({}, '', newUrl)
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
    </div>
  )
}

export default SearchFilters
