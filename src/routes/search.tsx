import React, { useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'

interface State {
  title: string
  type: string
  location: string[]
}

type Action =
  | {
      type: 'updateFilter'
      payload: {
        name: string
        value: string | string[]
      }
    }
  | { type: 'clearFilters' }

type Filter = keyof State

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateFilter':
      const { name, value } = action.payload
      return { ...state, [name]: value }
    case 'clearFilters':
      return { title: '', type: '', location: [] }
    default:
      return state
  }
}

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const INITIAL_STATE: State = {
    title: searchParams.get('title') || '',
    type: searchParams.get('type') || '',
    location: searchParams.getAll('location') || [],
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const hasFilters = Object.values(state).some(Boolean)

  useEffect(
    function updateSearchParams() {
      const searchParams = new URLSearchParams()

      Object.entries(state).forEach(([key, value]) => {
        console.log(value)

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
    [state]
  )

  function handleFilterChange(name: Filter, value: string | string[]) {
    dispatch({
      type: 'updateFilter',
      payload: { name, value },
    })
  }

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
          value={state.title}
          onChange={(event) => {
            handleFilterChange('title', event.target.value)
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
          value={state.type}
          id="type"
          onChange={(event) => {
            handleFilterChange('type', event.target.value)
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
          value={state.location}
          id="location"
          onChange={(event) => {
            const selectedValues = [...event.target.options]
              .filter((option) => option.selected)
              .map((option) => option.value)

            handleFilterChange('location', selectedValues)
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
          className="mt-4 text-gray-800 text-blue-800"
          onClick={() => dispatch({ type: 'clearFilters' })}
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

export default Search
