import { nanoid } from 'nanoid'
import delay from 'delay'
import sample from 'lodash/sample'
import { SearchFilters } from '../store/slices/searchSlice'

export interface Job {
  id: string
  title: string
  type: 'permanent' | 'contract'
  location: 'london' | 'manchester' | 'birmingham' | 'leeds'
}

const jobs = generateJobs()

export async function getJobs(filters: SearchFilters): Promise<Job[]> {
  console.log('Fetching jobs...')
  let filteredJobs = jobs

  if (filters.title) {
    filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(filters.title.toLowerCase())
    )
  }

  if (filters.type) {
    filteredJobs = filteredJobs.filter((job) => job.type === filters.type)
  }

  if (filters.location && filters.location.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      filters.location.includes(job.location)
    )
  }

  await delay(200)
  return filteredJobs
}

function generateJobs(): Job[] {
  const jobs: Job[] = []

  const types: Job['type'][] = ['permanent', 'contract']
  const locations: Job['location'][] = [
    'london',
    'manchester',
    'birmingham',
    'leeds',
  ]

  const languages = ['Java', 'TypeScript', 'Ruby', 'PHP']

  types.forEach((type) => {
    locations.forEach((location) => {
      languages.forEach((language) => {
        const id = nanoid()

        const title = `${language} ${sample([
          'Developer',
          'Engineer',
          'Ninja',
        ])}`

        jobs.push({
          id,
          title,
          type: type,
          location: location,
        })
      })
    })
  })

  return jobs
}
