import { nanoid } from 'nanoid'
import { SearchFilters } from './stores/search-store'
import delay from "delay";

export interface Job {
  id: string
  title: string
  type: 'permanent' | 'contract'
  location: 'london' | 'manchester' | 'birmingham' | 'leeds'
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

  await delay(200)
  return filteredJobs
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
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
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
