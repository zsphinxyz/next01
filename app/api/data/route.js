import data from '@/utils/data.json'

export async function GET(req) {
  return(
    new Response(data)
  )
}

export async function POST(req) {
  const body = await req.json()
  return(
    new Response('OK')
  )
}
 