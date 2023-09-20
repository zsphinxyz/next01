'use client'

import { useState } from "react"
import {useRouter} from 'next/navigation'

import {auth} from "@/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleLogin = (e:any) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push('/list')
            // ...
        })
        .catch((error) => {
            setErr(true);
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }

  return (
    <div className='flex h-screen items-center justify-center flex-col'>
        <form className='flex flex-col gap-5 items-center' onSubmit={handleLogin}>
            <input className='px-3 py-2 border-0 outline-none ' type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input className='px-3 py-2 border-0 outline-none ' type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className=' px-3 py-2 rounded-md bg-green-700 text-white font-bold w-16'>Login</button>
        </form> 
        {err && <span className=' mt-5 text-red-500 text-sm'>Incorrect email or password!</span>}
    </div>
  )
}

export default Login