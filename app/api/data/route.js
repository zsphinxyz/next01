import {data} from '@/utils/data'

export async function GET(req) {
  return(
    new Response(JSON.stringify(data))
  )
}

export async function POST(req) {
  const body = await req.json()
  return(
    new Response('OK')
  )
}
 