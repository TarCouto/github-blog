import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  // Remova o apiPrefix, já que não é necessário
  const url = new URL(path, baseUrl) // Apenas o path diretamente

  return fetch(url, init)
}
