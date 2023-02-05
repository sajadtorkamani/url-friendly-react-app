import React from 'react'

const SearchFilters: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block">
          Job title
        </label>
        <input
          type="text"
          id="title"
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
