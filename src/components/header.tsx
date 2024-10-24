import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center max-w-full">
      <Link href={'/'}>
        <Image
          src="/tech-bg.svg"
          className="w-full"
          width={24}
          height={24}
          alt="logo Github"
        />
      </Link>
    </div>
  )
}
