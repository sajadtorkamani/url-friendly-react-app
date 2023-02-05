import React from 'react'
import { Job } from '../types'

interface Props {
  results: Job[]
}

const SearchResults: React.FC<Props> = ({ results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>
  }

  return (
    <>
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </>
  )
}

export default SearchResults
