'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar Posts..."
        className="bg-base-input border border-base-border rounded-md p-3 px-4 w-full text-base-text placeholder:text-base-label"
        required
      />
    </form>
  )
}
