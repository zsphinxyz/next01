import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
    home <span className="text-4xl font-black text-gray-300 mt-4">PAGE</span> 
    <Link href="/one">One</Link>
    </main>
  )
}
