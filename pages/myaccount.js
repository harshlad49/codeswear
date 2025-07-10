import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import Auth from './Auth/Auth';
const myaccount = () => {
  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [instate, setinstate] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
 const [npassword, setNPassword] = useState('');
  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)) {
          setinstate(pinJson[e.target.value][1])
          setCity(pinJson[e.target.value][0])
        } else {
          setinstate('')
          setCity('')
        }
      } else {
        setinstate('')
        setCity('')
      }
    }

    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }
    else if (e.target.name == 'city') {
      setCity(e.target.value)

    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'instate') {
      setinstate(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCPassword(e.target.value)
    }
      else if (e.target.name == 'npassword') {
      setNPassword(e.target.value)
    }
  }


  useEffect(() => {
    const storedEmail = localStorage.getItem
('email');

    if (storedEmail) {
      setEmail(storedEmail);
    }
    fetchData()
  }, []);

  const fetchData = async () => {

    const token = localStorage.getItem('token');
    let data = { token };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let res = await a.json()
    
    setName(res.name)
    setAddress(res.address)
    setCity(res.city)
    setPhone(res.phone)
    setPincode(res.pincode)
    setinstate(res.instate)
  }
  const handleUserSubmit = async () => {
  const token = localStorage.getItem('token');
  const data = {
    token,
    name,
    address,
    city,
    instate,
    pincode,
    phone,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
 const response = await res.json();
    if (response.success) {
      toast.success('Account updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error('Failed to update account.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }
 const handlePasswordSubmit = async () => {
  let response; // Declare it here

  if (npassword === cpassword) {
    const token = localStorage.getItem('token');
    const data = {
      token,
      password,
      cpassword,
      npassword,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    response = await res.json();
  } else {
    response = { success: false };
  }

  if (response.success) {
    toast.success('Password updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  } else {
    toast.error('Failed to update Password.', {
      position: 'top-right',
      autoClose: 3000,
    });
  }


  
};
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
          <label htmlFor='pincode' className='leading-7 text-sm text-gray-600'>Pincode</label>
          <input onChange={handleChange} value={pincode} type='text' id='pincode' name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='city' className='leading-7 text-sm text-gray-600'>City</label>
          <input onChange={handleChange} value={city} type='text' id='city' name='city' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='instate' className='leading-7 text-sm text-gray-600'>State</label>
          <input onChange={handleChange} value={instate} type='text' id='instate'  name='instate' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
      </div>
      <div className='w-1/2 mb-5 px-3'>

        <button onClick={handleUserSubmit} className='flex items-center text-white bg-pink-500 border-0 px-4 py-2 focus:outline-none hover:bg-pink-600 rounded'>
          {/* <FaLock className='mr-2' /> */}
          Submit
        </button>

      </div>
      {/* </div> */}
      <h2 className='font-semibold text-xl px-3'>2. Password Change</h2>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='password' className='leading-7 text-sm text-gray-600'>Password</label>
          <input onChange={handleChange} value={password} type='password' id='password' name='password' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
<div className='w-1/2 mb-5 px-2'>
          <label htmlFor='npassword' className='leading-7 text-sm text-gray-600'>New Password</label>
          <input onChange={handleChange} value={npassword} type='password' id='npassword' name='npassword' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>
        <div className='w-1/2 mb-5 px-2'>
          <label htmlFor='cpassword' className='leading-7 text-sm text-gray-600'>Conform Password</label>
          <input onChange={handleChange} value={cpassword} type='password' id='cpassword' name='cpassword' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3' />
        </div>

      </div>
      <div className='py-10 px-4'>
        
          <button onClick={handlePasswordSubmit} className='flex items-center text-white bg-pink-500 border-0 px-4 py-2 focus:outline-none hover:bg-pink-600 rounded'>
            {/* <FaLock className='mr-2' /> */}
            Submit
          </button>
        
         <ToastContainer />
      </div>
    </div>

  )
}

export default Auth(myaccount)
