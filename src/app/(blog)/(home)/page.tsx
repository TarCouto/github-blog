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
  await new Promise((resolve) => setTimeout(resolve, 7000))
  const response = await api('/repos/TarCouto/github-blog/issues', {
    next: {
      revalidate: 60 * 60, // Revalida a cada 1 hora
    },
  })

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
    <div className="w-full flex flex-col gap-[2rem] pb-10">
      <PersonalInfo />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <span className="font-bold text-[1.125rem] leading-[160%] text-base-subtitle">
          Publicações
        </span>
        <small className="font-light text-[14px] leading-[160%] text-base-span">
          {postsCounter} publicaç{`${postsCounter > 1 ? 'ões' : 'ão'}`}
        </small>
      </div>
      <Suspense fallback={null}>
        <SearchForm />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {issues.map((issue) => (
          <PostCard
            key={issue.title}
            post={{
              title: issue.title,
              body: issue.body ?? '',
              created_at: issue.created_at,
              number: issue.url ? parseInt(issue.url.split('/').pop()!) : 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
