'use client'

import { DocumentData, collection, getDocs, orderBy, query } from "firebase/firestore";
import {db, auth} from "@/firebase/firebase"
import { useState, useEffect } from "react";
import Link from "next/link";

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
    auth.currentUser != null ?
    <div>
        {
            data.map(i => (
                <div key={i.id}>{i.id}. &nbsp;&nbsp; <b>{i.name}</b> &nbsp;&nbsp;&nbsp; ({i.year}, {i.room})</div>
            ))
        }
    </div>
    :
    <div>
        <p>You are not logged In. You need to log in to view the data.</p>
        <Link href="/auth" className="text-blue-800 underline px-5 py-1 m-10"> Login</Link>
    </div>
  )
}

export default Main