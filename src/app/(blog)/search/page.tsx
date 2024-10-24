import { redirect } from 'next/navigation'

import { api } from '@/data/api'
import { Issue } from '@/data/@types/issue'
import { PostCard } from '@/components/postCard'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchIssues(query: string): Promise<Issue[]> {
  const response = await api(
    `search/issues?q=${query}%20in:title%20is:issue%20is:open%20repo:TarCouto/github-blog`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`)
  }

  const data = await response.json()

  // Verifica se o retorno contém um array de items e o retorna, caso contrário, retorna um array vazio
  return data.items ?? []
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = await searchParams
  const issues = await searchIssues(query)
  const postsCounter = issues.length

  if (issues.length === 0) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1000px]">
      <div className="flex justify-between mb-4">
        <span className="font-bold text-[1.125rem] leading-[160%] text-base-subtitle mb-0">
          Publicações
        </span>
        <small className="font-light text-[14px] leading-[160%] text-base-span">
          {postsCounter} publicaç{`${postsCounter > 1 ? 'ões' : 'ão'}`}
        </small>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {issues.map((issue) => (
          <PostCard
            key={issue.title}
            post={{
              title: issue.title,
              body: issue.body ?? '',
              created_at: issue.created_at,
              number: issue.url ? parseInt(issue.url.split('/').pop()!) : 0, // Converte para número
            }}
          />
        ))}
      </div>
    </div>
  )
}
