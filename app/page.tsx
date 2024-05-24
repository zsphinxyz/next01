import { Analytics } from "@vercel/analytics/react"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-w-screen min-h-screen items-center justify-center flex-col">
      <p className='text-sm'>Home</p>
      <span className="text-4xl font-black text-gray-900">PAGE</span> 
      <div className="flex flex-col">
        <Link href="/sample" className ="px-8 py-1 bg-slate-500 text-gray-100 text-center font-bold hover:bg-slate-600 rounded mt-2 transition">Sample</Link>
        <Link href="/auth" className ="px-8 py-1 bg-slate-500 text-gray-100 text-center font-bold hover:bg-slate-600 rounded mt-2 transition">Login</Link>
      </div>
    </main>
  )
}
