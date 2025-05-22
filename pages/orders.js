import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Order from '@/models/Order';
import mongoose from "mongoose";

const orders = ({ }) => {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
     router.push('/')
    }
  }, [])
  return (
    <div>
      <div classNameName='container  mx-auto'>
        

<div className="relative md:px-40   ">
<h1 className='text-center md:py-8 py-4 font-bold  text-xl'>My Orders</h1>
<div className='container items-center w-auto'>
    <table className="w-auto md:w-full table-auto text-sm text-left rtl:text-right  ">
        <thead className="text-xs  uppercase   ">
            <tr>
                <th scope="col" className="px-3  md:px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-3  md:px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-3  md:px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-3  md:px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b hover:bg-gray-100  ">
                <th scope="row" className="px-3 h-auto md:px-6 py-4 font-medium whitespace-nowrap className">
                    Apple MacBook Pro 17" 
                </th>
                <td className="px-3 h-auto md:px-6 py-">
                    Silver
                </td>
                <td className="px-3 h-auto md:px-6 py-6">
                    Laptop
                </td>
                <td className="px-3 h-auto md:px-6 py-6">
                    $2999
                </td>
            </tr>
           
        </tbody>
    </table>
    </div>
</div>

      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let orders = await Order.find({  })
  
 
  return {
    props: { orders: orders },
  }
}

export default orders
