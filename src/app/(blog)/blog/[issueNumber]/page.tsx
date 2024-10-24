'use server'

import { formatDate } from '@/utils/formatDate'
import { Issue } from '@/data/@types/issue'
import { api } from '@/data/api'
import Link from 'next/link'
import { notFound } from 'next/navigation' // Para redirecionar caso não ache a issue
import '@fortawesome/fontawesome-free/css/all.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogProps {
  params: {
    issueNumber: string
  }
}
// Função para buscar os dados da issue com base no número
async function getIssueByNumber(issueNumber: string): Promise<Issue | null> {
  const response = await api(
    `/repos/TarCouto/github-blog/issues/${issueNumber}`,
    {
      next: {
        revalidate: 60 * 60, // Revalidação a cada 1 hora
      },
    },
  )

  if (!response.ok) {
    return null
  }

  const issue = await response.json()
  return issue
}

export async function generateStaticParams() {
  const response = await api('/repos/TarCouto/github-blog/issues')
  const issue: Issue[] = await response.json()

  return issue
    .filter((issue) => issue.number !== undefined) // Filtra as issues com number definido
    .map((issue) => {
      return { issueNumber: issue.number!.toString() } // Usa "!" para afirmar que number não é indefinido
    })
}

export default async function BlogPage({ params }: BlogProps) {
  const resolvedParams = await params // Aguarda a resolução da Promise `params`
  console.log('Params:', resolvedParams)

  if (!resolvedParams || !resolvedParams.issueNumber) {
    return notFound()
  }

  const issue = await getIssueByNumber(resolvedParams.issueNumber)

  if (!issue) {
    return notFound()
  }

  return (
    <div className="mt-[-7.5rem] flex flex-col items-center justify-center px-4">
      <div className="max-w-[1200px] min-w-[864px] h-auto w-full bg-base-profile p-6 shadow-lg rounded-lg flex flex-col">
        <header className="flex items-center justify-between">
          <Link
            className="no-underline bg-transparent text-blue transition-border duration-200 border-b-2 border-transparent flex items-center gap-2 uppercase font-bold text-xs leading-[160%] hover:border-blue"
            href={'/'}
          >
            <i className="fa-solid fa-chevron-left text-blue hover:border-blue"></i>
            Voltar
          </Link>
          <Link
            href={`${issue.html_url}`}
            target="_blank"
            rel="noreferrer"
            className="no-underline bg-transparent text-blue transition-border duration-200 border-b-2 border-transparent flex items-center gap-2 uppercase font-bold text-xs leading-[160%] hover:border-blue"
          >
            Ver no Github
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
        </header>
        <div className="mt-6">
          <h1 className=" text-2xl font-semibold mb-3 whitespace-pre-wrap">
            {issue.title}
          </h1>
        </div>
        <footer className="mt-2 flex items-center gap-6">
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-brands fa-github text-base-label"></i>
            {issue.user?.login}
          </span>
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-solid fa-calendar text-base-label"></i>
            {issue.created_at
              ? formatDate(issue.created_at)
              : 'Data não disponível'}
          </span>
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-solid fa-comment text-base-label"></i>
            {issue.comments} Comentários
          </span>
        </footer>
      </div>
      <div className="max-w-[864px] w-full p-6 whitespace-pre-wrap overflow-hidden">
        <div className="overflow-x-auto w-full h-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ ...props }) => (
                <p
                  className="text-base text-gray-300 leading-loose mb-4"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-blue text-2xl font-bold mb-4" {...props} />
              ),
              a: ({ ...props }) => (
                <a
                  className="no-underline bg-transparent text-blue hover:border-b-2 border-blue transition-all duration-200"
                  {...props}
                />
              ),
              img: ({ ...props }) => (
                <img
                  className="max-w-full mt-6"
                  alt={'Imagem sem descrição'}
                  {...props}
                />
              ),
            }}
          >
            {issue.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
