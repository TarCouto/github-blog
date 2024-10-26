import { PersonalInfo } from '@/components/personalInfo'
import { PostCard } from '@/components/postCard'
import { api } from '@/data/api'
import { Metadata } from 'next'
import { Issue } from '@/data/@types/issue'
import { SearchForm } from '@/components/buttonSearch'
import { Suspense } from 'react'
export const metadata: Metadata = {
  title: 'Home',
}

export async function getUserIssues(): Promise<Issue[]> {
  const response = await api('/repos/TarCouto/github-blog/issues', {
    next: {
      revalidate: 60 * 60, // Revalida a cada 1 hora
    },
  })

  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (!response.ok) {
    throw new Error('Failed to fetch user issues')
  }

  const issues = await response.json()

  return issues
}

export default async function Home() {
  const issues = await getUserIssues()
  const postsCounter = issues.length
  return (
    <div className="max-w-[864px] w-full flex flex-col gap-[2rem]">
      <PersonalInfo />
      <div className="flex justify-between">
        <span className="font-bold text-[1.125rem] leading-[160%] text-base-subtitle mb-0">
          Publicações
        </span>
        <small className="font-light text-[14px] leading-[160%] text-base-span">
          {postsCounter} publicaç{`${postsCounter > 1 ? 'ões' : 'ão'}`}
        </small>
      </div>
      <Suspense fallback={null}>
        <SearchForm />
      </Suspense>
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
