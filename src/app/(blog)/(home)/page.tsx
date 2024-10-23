import { PersonalInfo } from '@/components/personalInfo'
import { PostCard } from '@/components/postCard'
import { api } from '@/data/api'
import { Metadata } from 'next'
import { Issue } from '@/data/@types/issue'
export const metadata: Metadata = {
  title: 'Home',
}

export async function getUserIssues(): Promise<Issue[]> {
  const response = await api('/repos/TarCouto/github-blog/issues', {
    next: {
      revalidate: 60 * 60, // Revalida a cada 1 hora
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user issues')
  }

  const issues = await response.json()

  return issues.map((issue: Issue) => {
    const { title, body, html_url: url, state, created_at: createdAt } = issue

    return {
      title,
      body,
      url,
      state,
      createdAt,
    }
  })
}

export default async function Home() {
  const issues = await getUserIssues()
  return (
    <div className="max-w-[864px] w-full flex flex-col gap-[3rem]">
      <PersonalInfo />
      <div className="text-white">Componente SerachBlobg</div>
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
