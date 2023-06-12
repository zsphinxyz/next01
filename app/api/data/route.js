import {data} from '@/utils/data'

export async function GET(request) {
  console.log(data)
  return(
    new Response(JSON.stringify(data))
  )
}
