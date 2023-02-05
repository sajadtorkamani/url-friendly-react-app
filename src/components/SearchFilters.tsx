import React from 'react'

const SearchFilters: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const title = searchParams.get('title') || ''

  console.log({ title })

  function updateSearchParam(key: string, value: string) {
    searchParams.set(key, value)

    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${searchParams.toString()}`

    window.history.pushState({}, '', newUrl)
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
            updateSearchParam('title', event.target.value)
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
        >
          <option value="any">Any</option>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilters
