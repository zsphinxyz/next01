import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
     <p className='text-sm'>Home</p>
    <span className="text-4xl font-black text-gray-300">PAGE</span> 
    <div className="flex flex-col">
      <Link href="/list" className ="px-8 py-1 bg-slate-300 text-gray-800 font-bold hover:bg-slate-200 rounded mt-2 transition">List</Link>
    </div>
    </main>
  )
}
