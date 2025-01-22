import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full max-w-[1600px] grid-rows-[auto_1fr] gap-[4.5rem] mx-auto px-4 md:px-6 lg:px-8">
      <Header />
      <main className="w-full max-w-[864px] mx-auto">
        {children}
      </main>
    </div>
  )
}
