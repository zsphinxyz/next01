import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'z.......z',
  description: 'Stupid Data...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className=' leading-10 bg-slate-500 p-3 mb-10'>NAV BAR IN LAYOUT PAGE</h1>
        {children}
      </body>
    </html>
  )
}
