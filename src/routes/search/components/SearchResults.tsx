import React from 'react'
import capitalize from 'lodash/capitalize'
import { Job } from '../../../lib/jobs'

interface Props {
  isLoading: boolean
  results: Job[]
}

const SearchResults: React.FC<Props> = ({ isLoading, results }) => {
  function render() {
    if (isLoading) {
      return <div className="text-gray=600">Loading...</div>
    }

    if (results.length === 0) {
      return <>No results found</>
    }

    return renderResults()
  }

  function renderResults() {
    return (
      <>
        <div className="mb-2 text-sm text-gray-600">
          Showing {results.length} jobs
        </div>

        {results.map((job) => (
          <div key={job.id} className="mb-3 border border-gray-300 p-4">
            <h3 className="mb-2 flex items-center">
              <span className="text-xl font-bold">{job.title}</span>
              <span className="ml-2 text-xs text-gray-500">(#{job.id})</span>
            </h3>
            <p className="mb-1 text-gray-600">Type: {capitalize(job.type)}</p>
            <p className="text-gray-600">
              Location: {capitalize(job.location)}
            </p>
          </div>
        ))}
      </>
    )
  }

  return <section className="flex-1 md:ml-6">{render()}</section>
}

export default SearchResults
