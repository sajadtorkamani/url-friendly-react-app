import { nanoid } from 'nanoid'
import delay from 'delay'
import { SearchFilters } from './stores/search-store'

export interface Job {
  id: string
  title: string
  type: 'permanent' | 'contract'
  location: 'london' | 'manchester' | 'birmingham' | 'leeds'
}

function generateJobs(): Job[] {
  let jobs: Job[] = []

  const types: Job['type'][] = ['permanent', 'contract']
  const locations: Job['location'][] = [
    'london',
    'manchester',
    'birmingham',
    'leeds',
  ]
  const titles = [
    'Front-end Developer',
    'Back-end Developer',
    'Full-stack Developer',
  ]

  types.forEach((type, jobTypeIndex) => {
    locations.forEach((location) => {
      titles.forEach((jobTitle) => {
        const id = nanoid()

        jobs.push({
          id,
          title: jobTitle,
          type: type,
          location: location,
        })
      })
    })
  })

  return jobs
}

const jobs = generateJobs()

export async function getJobs(filters: SearchFilters): Promise<Job[]> {
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

  await delay(500)
  return filteredJobs
}
