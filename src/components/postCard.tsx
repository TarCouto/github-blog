'use client'
import { useRouter } from 'next/navigation'
import { formatText } from '@/utils/formatText'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IPost } from '@/data/@types/issue'

export function PostCard({ post }: { post: IPost }) {
  const router = useRouter()
  const {
    created_at: createdAt = '',
    body = '',
    title = 'Sem título',
    number = '',
  } = post
  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), {
        locale: ptBR,
        addSuffix: true,
      })
    : 'Data desconhecida'

  const handleClick = () => {
    console.log(number) // Verifique o valor do 'number'
    if (number) {
      router.push(`/blog/${number}`)
    } else {
      alert('Número do post não disponível')
    }
  }
  return (
    <div
      onClick={handleClick}
      className="w-full no-underline flex flex-col gap-5 p-8 bg-base-post rounded-lg border-2 border-transparent h-[260px] overflow-hidden transition-border duration-200 cursor-pointer"
    >
      <header className="flex justify-between gap-4">
        <h1 className="font-bold text-lg leading-[160%] text-base-title text-justify">
          {title}
        </h1>
        <span className="text-xs leading-[160%] text-base-span">
          {formattedDate}
        </span>
      </header>
      <main className="hover:border-2 hover:border-base-label h-[112px] overflow-hidden">
        <p className="h-full text-justify text-base-text">
          {formatText(body || '', 80)}
        </p>
      </main>
    </div>
  )
}
