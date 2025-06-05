import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

const myaccount = () => {
  const router = useRouter()

  const [email , setEmail] = useState('');
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
  return (
    <div className='container mx-auto my-9'>
      <h1 className='text-3xl text-center font-bold'>Update Your Account</h1>
       <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl px-3'>1. Delivery Details</h2>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='name' className='leading-7 text-sm text-gray-600'>Name</label>
          <input type='text' id='name' name='name' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='email' className='leading-7 text-sm text-gray-600'>Email (cannot be updated)</label>
          <input type='email' id='email' value={email}name='email' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>

      <div className='px-6 w-full mb-5'>
        <div className='mb-6 px-2'>
          <label htmlFor='address' className='leading-7 text-sm text-gray-600'>Address</label>
          <textarea id='address' name='address' rows='2' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3'></textarea>
        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='phone' className='leading-7 text-sm text-gray-600'>Phone No</label>
          <input type='text' id='phone' name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='state' className='leading-7 text-sm text-gray-600'>State</label>
          <input type='text' id='state' name='state' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='city' className='leading-7 text-sm text-gray-600'>City</label>
          <input type='text' id='city' name='city' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='pincode' className='leading-7 text-sm text-gray-600'>Pincode</label>
          <input type='text' id='pincode' name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>
      <h2 className='font-semibold text-xl px-3'>2. Password Change</h2>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='password' className='leading-7 text-sm text-gray-600'>Password</label>
          <input type='text' id='password' name='password' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

         <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='cpassword' className='leading-7 text-sm text-gray-600'>Conform Password</label>
          <input type='text' id='cpassword' name='cpassword' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
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
