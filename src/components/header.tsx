import Image from 'next/image'

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center max-w-full">
      <Image
        src="/tech-bg.svg"
        className="w-full"
        width={24}
        height={24}
        alt="logo Github"
      />
    </div>
  )
}
