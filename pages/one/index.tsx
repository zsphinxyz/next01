import '@/app/globals.css'
import Table from '@/components/Table'
import {data1} from '@/utils/data1'
import {data2} from '@/utils/data2'
import {data3} from '@/utils/data3'
import { useState } from 'react'

const index = () => {
  const [data, setData] = useState('0')
  let allData = [data1, data2, data3]
  
  return (
    <div>
      <select name='data' 
              value={data}
              onChange={e=>setData(e.target.value)}
              className='m-8 px-3 py-1 text-black rounded-md'>
        <option value='0'>Data 1</option>
        <option value='1'>Data 2</option>
        <option value='2'>Data 3</option>
      </select>
      <h1>{data}</h1>
        <h1 className='text-center text-2xl font-bold'> Data {parseInt(data)+1} </h1>
        <Table data={allData[parseInt(data)]}/>
    </div>
  )
}

export default index