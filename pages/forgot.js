import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'cpassword') {
      setCPassword(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
    console.log(router.query);
  }, []);

  const sendResetEmail = async (e) => {
    e.preventDefault();

    const data = {
      email,
      sendEmail: true,
    };

    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await a.json();

    if (res.success) {
      // Navigate to the reset form with token in query
      router.push(`/forgot?token=${res.token}`);
    } else {
      console.log("Error sending reset email");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password === cpassword) {
      const data = {
        password,
        sendEmail: false,
        token: router.query.token,
      };

      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await a.json();

      if (res.success) {
        alert("Password has been changed");
        router.push('/login');
      } else {
        alert("Failed to reset password");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-16 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="favicon.ico" alt="Your Company" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {router.query.token ? 'Reset Your Password' : 'Enter Your Email'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {router.query.token ? (
          <div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="New Password"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  value={cpassword}
                  onChange={handleChange}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={resetPassword}
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Continue
              </button>
            </div>
            {password !== cpassword && (
              <span className="text-red-600">Passwords do not match</span>
            )}
             {password && password == cpassword && (
              <span className="text-green-600">Passwords match</span>
            )}
          </div>
        ) : (
          <div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-1 focus:z-10 focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={sendResetEmail}
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          <a href="/login" className="font-semibold leading-6 hover:text-pink-500">
            Back to login page?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
