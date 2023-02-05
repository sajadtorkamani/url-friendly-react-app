import React from 'react'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'

const App: React.FC = () => {
  return (
    <main className="mx-auto max-w-2xl pt-6">
      <div className="mb-6">
        <SearchFilters />
      </div>

      <SearchResults results={[]} />
    </main>
  )
}

export default App
