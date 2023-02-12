import React from 'react'
import sample from 'lodash/sample'
import capitalize from 'lodash/capitalize'
import { Job } from '../../../jobs'

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
      return renderNoResultsMessage()
    }

    return renderResults()
  }

  function renderResults() {
    return (
      <>
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

  function renderNoResultsMessage() {
    const endearment = sample([
      'hombre',
      'amigo',
      'sénior',
      'pal',
      'comrade',
      'buddy',
      'monsieur',
    ])
    return <>No results {endearment}</>
  }

  return (
    <section className="border-top mt-6 border-t-2 border-gray-200 pt-4">
      {render()}
    </section>
  )
}

export default SearchResults
