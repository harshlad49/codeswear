import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [creadentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const pressShow = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: creadentials.email,
      password: creadentials.password
    })
  });

  const json = await response.json();
  console.log(json);

  if (json.success) {
    toast.success('Logged in successfully!', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    localStorage.setItem('token', json.token);
    localStorage.setItem('email', creadentials.email);
    localStorage.setItem("isAdmin", json.isAdmin);
    setTimeout(() => {
      if (json.isAdmin) {
        router.push('/admin/Dashboard');
      } else {
        router.push('/');
      }
    }, 1600);
  } else {
    toast.error('Invalid credentials. Please try again.', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }
};


  const handleChange = (e) => {
    setCredentials({ ...creadentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-16 lg:px-8">
      <ToastContainer />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="favicon.ico" alt="Your Company" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                onChange={handleChange}
                placeholder='Email Address'
                value={creadentials.email}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                onChange={handleChange}
                placeholder='Password'
                value={creadentials.password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
              <button
               type="button"
                onClick={pressShow}
                className="absolute inset-y-0 right-2 px-2 text-sm font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ?  <EyeOff size={18} />  :  <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex text-sm">
            <Link href="/forgot" className="font-semibold text-pink-600 hover:text-pink-500 pl-36">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link href="/singup" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
