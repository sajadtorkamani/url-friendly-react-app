// Update URL search params
export function updateSearchParams(
  key: string,
  value: string | string[]
): string {
  const searchParams = new URLSearchParams(window.location.search)

  // Handle empty values by removing the search param
  if (value === '') {
    searchParams.delete(key)
  }
  // Handle multiple values
  else if (Array.isArray(value)) {
    searchParams.delete(key) // Delete all values and rebuild in next line
    value.forEach((arrayValue) => {
      searchParams.append(key, arrayValue)
    })
  } else {
    // Handle scalar values
    searchParams.set(key, value)
  }

  return searchParams.toString()
}
