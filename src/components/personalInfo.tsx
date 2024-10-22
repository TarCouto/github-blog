import { api } from '@/data/api'
import Image from 'next/image'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.css'

// Certifique-se de que o arquivo api está configurado corretamente

interface IUserInfo {
  name: string
  followers: number
  githubUsername: string
  company: string
  url: string
  imgUrl: string
  description: string
}

export async function getDataProfile(): Promise<IUserInfo> {
  const response = await api('/users/TarCouto', {
    next: {
      revalidate: 60 * 60, // Revalida a cada 1 hora
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  const data = await response.json()

  const {
    name,
    followers,
    login: githubUsername,
    company,
    html_url: url,
    avatar_url: imgUrl,
    bio: description,
  } = data

  return {
    name,
    followers,
    githubUsername,
    company,
    url,
    imgUrl,
    description,
  }
}

export async function PersonalInfo() {
  const data = await getDataProfile()
  return (
    <div className="max-w-[864px] w-full h-[200px] flex shadow-[0px_2px_28px_rgba(0,0,0,0.2)] rounded-[10px] p-8 gap-8 bg-base-profile -mt-40">
      <Image
        src={data.imgUrl}
        width={148}
        height={148}
        alt={''}
        className=" rounded-md "
      />
      <div className="w-full h-full flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h1 className="font-bold text-xl leading-[130%]">{data.name}</h1>
          <Link
            href={data?.url}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-xs  hover:text-blue leading-[160%] uppercase no-underline flex gap-2 items-center text-blue-500 transition-border duration-200 border-b-2 border-transparent hover:border-blue"
          >
            GITHUB{' '}
            <i className="fa-solid fa-arrow-up-right-from-square hover:text-blue"></i>
          </Link>
        </header>
        <main>
          <p className="mt-2 break-words w-full text-white">
            {data.description}
          </p>
        </main>
        <footer className="flex h-full items-end gap-6">
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-brands fa-github"></i>
            {data?.githubUsername}
          </span>
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-solid fa-building"></i>
            {data?.company}
          </span>
          <span className="flex items-center gap-2 text-base-subtitle">
            <i className="fa-solid fa-user-group"></i>
            {data?.followers} Followers
          </span>
        </footer>
      </div>
    </div>
  )
}
