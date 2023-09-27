'use client'
import { useState, useEffect } from "react"
import { collection, addDoc, setDoc, doc, getDocs, query, where, orderBy } from "firebase/firestore";
import {db} from "@/firebase/firebase"
import yearData from '@/utils/year.json'


import data from "@/utils/data.json"

const Create = () => {
    // const [student, setStudent] = useState({id: 0, no: 0, name: '', year: '', room: 0})
    const [id, setId] = useState(0);
    const [no, setNo] = useState(0);
    const [name, setName] = useState('');

    const [year, setYear] = useState('Nursery');
    const [room, setRoom] = useState<number[]>([]);
    const [addRoom, setAddRoom] = useState(1)
    const [error, setError] = useState<boolean | null>(true)

    const [lastId, setLastId] = useState(0)
    const [lastNo, setLastNo] = useState(0)

    
    useEffect(() => {

          // Automatically Change Rooms According to Year selection from dropdown
      yearData.map(i => (
        i.year == year && setRoom(i.room)
      ))


          // Get Documents from firestore
      const getDocsFromFirestore = async() => {
        const q = query(collection(db, year), where("room", "==", addRoom));
        const querySnapshot = await getDocs(q);
        setLastNo(querySnapshot.size)

        const q2 = query(collection(db, 'all'), where("year", "==", 9), orderBy('id'));
        const querySnapshot2 = await getDocs(q2);
        setLastId(querySnapshot2.docs.at(-1)?.data().id)
      }
      getDocsFromFirestore();
    }, [year, addRoom])


    
    const handleSubmit = async(e:any) => {
      e.preventDefault()
        try {
          await setDoc(doc(db, "all", id.toString()), {id, no, name, year, room});
          setError(false);
          } catch (e) {
            console.error("Error adding document: ", e);
            setError(true);
          }

        
              // add all data to firestore (total 736)
        // data.filter(j => j.year == '4').map(async i => {
        //   await setDoc(doc(db, "4", i.id.toString()), {id: i.id, no: i.no, name: i.name, year: i.year, room: i.room})
        // })
    }

  return (
    <div>
        <form className="flex flex-col gap-3 w-9/12 max-w-[500px] mx-auto border p-5 rounded-md border-blue-300">
          <div className=" grid grid-cols-2 gap-2 [&>*]:outline-0 [&>*]:leading-9 [&>*]:pl-2">

            <select onChange={e=>{
              setYear(e.target.value)
              }}
              className="p-2 text-black bold outline-none"
            >
              {
                yearData.map((i) => (
                  <option key={i.year} 
                    value={i.year}
                    defaultValue={year}
                    className='hover:bg-green-300 '
                  >
                    {['Nursery','Reception', 'All'].includes(i.year) ? i.year : 'Year '+i.year}
                  </option>	
                ))
              }
            </select>

            <select onClick={e => setAddRoom(parseInt(e.currentTarget.value))}>
              {
                room.map( i => (
                  <option
                    key={i}
                    value={i}
                    disabled = {room.length == 0 && true}
                  >
                    {i}
                  </option>
                ))
              }
            </select>

            <input type="text" placeholder="name" required={true} onChange={e => setName(e.target.value)} className=" col-span-2"/>
            <div>
              ID: {lastId}
            </div>
            <div>
              No: {lastNo}
            </div>
          </div>
          <button type="submit" className="bg-blue-500 w-24 mx-auto rounded cursor-pointer hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
        </form>

        <p className="text-center mt-5 text-green-500 font-bold">{!error && 'Success'}</p>

    </div>
  )
}

export default Create