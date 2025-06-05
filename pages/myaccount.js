import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

const myaccount = () => {
  const router = useRouter()

   const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [pincode , setPincode] = useState('');
    const [instate , setinstate] = useState('');
    const [address , setAddress] = useState('');
    const [city , setCity] = useState('');
  const [password , setPassword] = useState('');
  const [cpassword , setCPassword] = useState('');
  
   const handleChange = async (e)=>{
    
    if(e.target.name == 'name'){
      setName(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name == 'pincode'){
      setPincode(e.target.value)
    }
      else if(e.target.name == 'password'){
      setPassword(e.target.value)
      }
    else if(e.target.name == 'instate'){
      setinstate(e.target.value)
    }
    else if(e.target.name == 'city'){
      setCity(e.target.value)
    }
    else if(e.target.name == 'cpassword'){
      setCPassword(e.target.value)
    }
  }
  // useEffect(() => {
  //   if(!localStorage.getItem('token')){
  //    router.push('/')
  //   }
  // }, [])
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  const handleUserSubmit  = async () =>{
    let data = { }
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser}`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json', 
    },
    body: JSON.stringify(data),
  })}
  return (
    <div className='container mx-auto my-9'>
      <h1 className='text-3xl text-center font-bold'>Update Your Account</h1>
       <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl px-3'>1. Delivery Details</h2>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='name' className='leading-7 text-sm text-gray-600'>Name</label>
          <input type='text' onChange={handleChange} value={name} id='name' name='name' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='email' className='leading-7 text-sm text-gray-600'>Email (cannot be updated)</label>
          <input
  type='email'
  id='email'
  value={email}
  name='email'
  readOnly
  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3'
/>
        </div>
      </div>

      <div className='px-6 w-full mb-5'>
        <div className='mb-6 px-2'>
          <label htmlFor='address' className='leading-7 text-sm text-gray-600'>Address</label>
          <textarea id='address' name='address' rows='2' onChange={handleChange} value={address} className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3'></textarea>
        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='phone' className='leading-7 text-sm text-gray-600'>Phone No</label>
          <input onChange={handleChange} value={phone} type='text' id='phone' name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='state' className='leading-7 text-sm text-gray-600'>State</label>
          <input value={instate} type='text' id='state' onChange={handleChange} name='state' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='city' className='leading-7 text-sm text-gray-600'>City</label>
          <input onChange={handleChange} value={city} type='text' id='city' name='city' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='pincode' className='leading-7 text-sm text-gray-600'>Pincode</label>
          <input onChange={handleChange} value={pincode} type='text' id='pincode' name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>
      <h2 className='font-semibold text-xl px-3'>2. Password Change</h2>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='password' className='leading-7 text-sm text-gray-600'>Password</label>
          <input onChange={handleChange} value={password} type="password" className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

         <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='cpassword' className='leading-7 text-sm text-gray-600'>Conform Password</label>
          <input onChange={handleChange} value={cpassword} type='password' id='cpassword' name='cpassword' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
        
      </div>
            <div className='py-10 px-4'>
        <Link href='/order'>
          <button className='flex items-center text-white bg-pink-500 border-0 px-4 py-2 focus:outline-none hover:bg-pink-600 rounded'>
            {/* <FaLock className='mr-2' /> */}
            Submit
          </button>
        </Link>
      </div>
    </div>

  )
}

export default myaccount
