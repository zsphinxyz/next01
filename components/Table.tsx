// 'use client'
import { useEffect, useState } from 'react'
import '@/app/globals.css'
import Card from '@/components/Card'

function Table({data}: any) {
  const [search, setSearch] = useState('')
  const [id, setID] = useState(0)
  const [pic, setPic] = useState('')
  const [detail, setDetail] = useState(null)
  const [age, setAge] = useState(false)
  const [gpa, setGpa] = useState(false)

  function handleRowClick(e: any) {
    setID(e.currentTarget.innerText.replace(/\s+/g, ',').split(',')[0]);
  }

  useEffect(()=>{
    setDetail(data[id-1])
  }, [id])

  return (
    <div>

      <input  type="text" 
              placeholder='🔎Search...' 
              className='inline-block mx-4 w-1/2 px-4 py-1 rounded bg-gray-100 text-black lowercase'
              onChange={e => setSearch(e.target.value)}
      />
      <input  type="checkbox" 
              onChange={e=>setAge(!age)}
      /> Age 
      <input  type="checkbox" 
              onChange={e=>setGpa(!gpa)}
      /> GPA 

      <div className='flex'>
        <table className='m-5 border border-spacing-3'>
          <thead className='border text-center'>
            <tr className='text-black bg-gray-400'>
              <th>ID</th>
              <th>Name</th> 
              <th>Email</th>
              <th>Phone</th>
              {age && <th>Age </th> }
              {gpa && <th>GPA </th> }
            </tr>
          </thead>

          <tbody className='border'>
              {
                data && data.filter((i: { name: string; })=> i.name.toLowerCase().includes(search.toLocaleLowerCase())).map((item: { id: number; name: string; email: string; phone: string; age: number; gpa: number; pic?: string }) => (
                  <tr key={item.id} 
                      className='border hover:bg-gray-900 cursor-default'
                      onClick={handleRowClick}
                      >
                    <td className='w-auto px-2 border'>{item.id}</td>
                    <td className='w-auto px-2 border name'>{item.name}</td>
                    <td className='w-auto px-2 border'>{item.email}</td>
                    <td className='w-auto px-2 border'>{item.phone}</td>
                    {age && <td className='w-auto px-2 border'>{item.age} </td>}
                    {gpa && <td className='w-auto px-2 border'>{item.gpa} </td>}
                  </tr>
                ))
                
              }

          </tbody>
        </table>

      <Card detail={detail} id={id}/>

      </div>


    </div>

  )
}

export default Table