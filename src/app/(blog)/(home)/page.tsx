import { PersonalInfo } from '@/components/personalInfo'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  return (
    <div className="max-w-[864px] w-full flex flex-col gap-[3rem]">
      <PersonalInfo />
      <div className="text-white">Componente SerachBlobg</div>
      <div className="grid grid-cols-2 gap-8">
        <div className="text-white">Post Card</div>
        <div className="text-white">Post Card</div>
        <div className="text-white">Post Card</div>
        <div className="text-white">Post Card</div>
        <div className="text-white">Post Card</div>
      </div>
    </div>
  )
}
