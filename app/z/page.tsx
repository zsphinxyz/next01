'use client'
import {useState} from 'react'

const ZSPHINX = () => {
  const [pwd, setPwd] = useState('')
  const [correct, setCorrect] = useState(false)

  const handleSubmit = ()=>{
    pwd == 'professionalskit' ? setCorrect(true) : setCorrect(false);
  }
  return (
    <div>
      <input 
        className='block px-1 py-2 ml-4 rounded text-black'
        placeholder='Enter Password to get Access...' 
        type='password' 
        onChange={e=>setPwd(e.target.value)} />
      <button 
        className="px-2 py-1 ml-5 bg-gray-100 text-gray-900 rounded mt-4"
        type="submit" 
        onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ZSPHINX