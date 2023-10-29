'use client'

import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation'

import {auth, googleProvider} from "@/firebase/firebase"
import { signInWithPopup, signOut,  } from "firebase/auth";


const Login = () => {
  const router = useRouter()

  useEffect(()=>{
    router.refresh();
  },[])

  const handleGoogleLogin = async() => {
    try{
      await signInWithPopup(auth, googleProvider)
      console.log(auth.currentUser?.email)
      router.push('/main')
      router.refresh()
    } 
    
    catch(error){
      console.error(error)
    }
  }

  const logOut = async() => {
    await signOut(auth);
    router.refresh()
  }

  return (
    <div className='flex h-screen items-center justify-center flex-col gap-3'>
        {
        auth.currentUser !== null ? 
          <>
            <p>You are currently logged in as {auth.currentUser?.email}</p>
            <button onClick={logOut} className=" px-8 py-2 bg-sky-200 rounded-lg text-slate-700 border-sky-300 border-2 hover:bg-sky-300 hover:text-black transition">Log Out</button>
          </>
          :
          <>
          <button onClick={handleGoogleLogin} className=" px-8 py-2 bg-sky-200 rounded-lg text-slate-700 border-sky-300 border-2 hover:bg-sky-300 hover:text-black transition">Login With Google</button>
          </>
          
      }
    </div>
  )
}

export default Login;