import { Issue } from '@/data/@types/issue'
import { api } from '@/data/api'
import Link from 'next/link'
import { notFound } from 'next/navigation' // Para redirecionar caso não ache a issue

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
  // Captura o número da issue a partir da URL dinâmica
  const issue = await getIssueByNumber(params.issueNumber.toString())

  // Se não encontrar a issue, redireciona para a página 404
  if (!issue) {
    notFound()
  }

  return (
    <div className="mt-[-5.5rem] flex flex-col items-center justify-center px-4">
      <div className="max-w-[864px] w-full h-auto bg-base-profile p-8 shadow-lg rounded-lg flex flex-col">
        <header>
          <button>
            <i className="fa-solid fa-chevron-left"></i>
            Voltar
          </button>
          <Link href={`${issue.html_url}`} target="_blank" rel="noreferrer">
            Ver no Github
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
        </header>
        <div>
          <h1>{issue.title}</h1>
        </div>
        <footer>
          <span>
            <i className="fa-brands fa-github"></i>
            {issue.user?.login}
          </span>
          <span>
            <i className="fa-solid fa-calendar"></i>
            {issue.created_at}
          </span>
          <span>
            <i className="fa-solid fa-comment"></i>
            {issue.comments} Comentários
          </span>
        </footer>
      </div>
    </div>
  )
}
