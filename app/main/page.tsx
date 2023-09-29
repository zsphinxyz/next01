'use client'

import { DocumentData, collection, getDocs, orderBy, query } from "firebase/firestore";
import {db} from "@/firebase/firebase"
import { useState, useEffect } from "react";

const Main = () => {

    const [data, setData] = useState<DocumentData[]>([])

    useEffect(() => {0
        const getData = async() => {
            const res = await getDocs(query(collection(db, "all"), orderBy('id')));
            const firebaseData = res.docs.map( i => i.data())
            setData(firebaseData)
        }
        getData()
    }, [])

  return (
    <div>

        {
            data.map(i => (
                <div key={i.id}>{i.id}. &nbsp;&nbsp; <b>{i.name}</b> &nbsp;&nbsp;&nbsp; ({i.year}, {i.room})</div>
            ))
        }
	

    </div>
  )
}

export default Main