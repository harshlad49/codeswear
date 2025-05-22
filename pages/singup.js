import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import {  useEffect } from 'react'
const singup = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const pressShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
    }
  useEffect(() => {
    if(localStorage.getItem('token')){
     router.push('/')
    }
  }, [])
  const[creadentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""})
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = creadentials;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/singup`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json);
    
   
  if (json.success){


      
      router.push('/login')
  }
  }
  const handleChange = (e)=>{
    setCredentials({...creadentials,[e.target.name]: e.target.value})
}
  return (
        <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20 w-auto " src="favicon.ico " alt="Your Company" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6"  method="POST">

              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="mt-2">
                  <input onChange={handleChange} placeholder='Name' value={creadentials.name} id="name" name="name" type="name" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="email" placeholder='Email Address' onChange={handleChange} value={creadentials.email} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                </div>
                <div className="mt-2">
                  <input id="password" placeholder='Password' onChange={handleChange} value={creadentials.password} name="password" type={showPassword ? 'text' : 'password'} minLength={5} required autoComplete="current-password"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1  focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                  <button
          onClick={e => pressShow(e)}
         className="
           relative
         bottom-8 md:left-80 left-72
         focus:text-gray-500 rounded text-sm font-semibold  " >{showPassword ? 'Hide' : 'Show'}</button>
                </div>
               </div>

               <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign Up</button > 
                  
                  </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <a href={"/login"} className="font-semibold leading-6 text-pink-600 hover:text-pink-500">than login</a>
          </p>
        </div>
  )
}

export default singup
