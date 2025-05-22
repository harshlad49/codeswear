import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/router";
const myaccount = () => {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
     router.push('/')
    }
  }, [])
  return (
    <div>
      <h1>fghfgh</h1>
    </div>
  )
}

export default myaccount
