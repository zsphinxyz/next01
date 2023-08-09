import '@/app/globals.css'
import { useEffect, useState } from 'react'

const Branch = () => {
    const [data, setData] = useState('');

    useEffect(()=>{
        const getData = async ()=>{
            const res = await fetch("/api/data");
            const data = await res.json();
            setData(JSON.stringify(data))
        }
        getData();
    },[])

  return (
    <div>
        {data}
    </div>
  )
}

export default Branch