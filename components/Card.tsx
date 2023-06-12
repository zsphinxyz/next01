// 'use client'

import { useEffect, useState } from "react"

const Card = ({detail, id}: any) => {
    const [showInfo, setShowInfo] = useState(false)

    useEffect(()=>{
        id !== 0 || showInfo ? setShowInfo(true) : setShowInfo(false);
    }, [id])

    const handleInfoClick = ()=>{
        setShowInfo(false)
    }

  return (
    <div style={showInfo ? {display:'block'} : {display:'none'}} 
        className='w-96 pb-2 min-h-96 h-auto bg-slate-700 mt-12 rounded-lg shadow fixed right-4 clear-both cursor-default'>
        <img    className=" m-2 border-4 rounded-full bg-slate-800 shadow-lg float-left" 
                src={detail?.pic} 
                alt={detail?.name} />
        <h1 className="pl-8 font-bold text-4xl h-28 pt-10">{detail?.name}
        <span className="text-sm bg-white rounded-full bottom-2 ml-2 relative">✔</span></h1>
        <div className="w-full h-0.5 bg-white mt-3" />
        <div className="px-4 py-2 mt-4 border rounded-lg w-11/12 mx-auto">
            <table>
                <tbody>

                    <tr>
                        <td>Name</td>
                        <td>: {detail?.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>: {detail?.email}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>: {detail?.age} years old</td>
                    </tr>
                    <tr>
                        <td>GPA</td>
                        <td>: {detail?.gpa}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>: {detail?.gender}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>: {detail?.phone}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>: {detail?.address}</td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div className="absolute right-0 top-0 cursor-pointer" onClick={handleInfoClick}>❌</div>
    </div>
  )
}

export default Card