import React from 'react'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'

const App: React.FC = () => {
  return (
    <>
      <SearchFilters />
      <SearchResults results={[]} />
    </>
  )
}

export default App
