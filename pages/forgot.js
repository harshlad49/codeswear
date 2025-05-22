import React from 'react'
import { useRouter } from "next/router";
import {  useEffect } from 'react'
const forgot = () => {
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
     router.push('/')
    }
    console.log(router)
  }, [])
  const sendResetEmail =()=>{
    // let a =await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }),
  }
  const resetPassword =()=>{

  }
  return (
    
      <div className="flex min-h-screen flex-col justify-center px-6 py-16  lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-20 w-auto " src="favicon.ico " alt="Your Company"/>
    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {router.query.token &&  <form  className="space-y-6"  method="POST">
      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
        <div className="mt-2">
          <input id="password" placeholder='New Password'  name="password" type="password" autoComplete="password" required className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1  focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        <div className="mt-2">
          <input id="cpassword" placeholder='Confirm Password'  name="cpassword" type="cpassword" autoComplete="cpassword" required className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1  focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
 
      <div>
      <button onClick={resetPassword} type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
      </div>
    </form>}

    {!router.query.token && <form  className="space-y-6"  method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" placeholder='Email Address'  name="email" type="email" autoComplete="email" required className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1  focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
      <button onClick={sendResetEmail} type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
      </div>
    </form>}

    <p className="mt-10 text-center text-sm text-gray-500">
      <a href={"/singup"} className="font-semibold leading-6  hover:text-pink-500"> Back to login Page ?</a>
    </p>
  </div>
</div>
   

  )
}

export default forgot
