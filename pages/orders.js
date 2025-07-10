import React, { useState } from 'react'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Auth from './Auth/Auth';


const orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders =async ()=>{
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      })
      let res = await a.json()
       setOrders(res.orders)
      // console.log(res)
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
    } else {
      fetchOrders();
    }
  }, [])
  return (
    <div className='min-h-screen'>
      <div className='container  mx-auto'>


        <div className="relative md:px-40   ">
          <h1 className='text-center md:py-8 py-4 font-bold  text-xl'>My Orders</h1>
          <div className='container items-center w-auto'>
            <table className="w-auto md:w-full table-auto text-sm text-left rtl:text-right  ">
              <thead className="text-xs  uppercase   ">
                <tr>
                  <th scope="col" className="px-3  md:px-6 py-3">
                    #OrderId
                  </th>
                  <th scope="col" className="px-3  md:px-6 py-3">
                   Name
                  </th>
                  <th scope="col" className="px-3  md:px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-3  md:px-6 py-3">
                  Details
                  </th>
                </tr>
              </thead>
              <tbody>
              {orders.map((item)=>{
                return<tr key={item._id} className="bg-white border-b  ">
                  <th scope="row" className="px-3 h-auto md:px-6 py-4 font-medium whitespace-nowrap className">
                   {item.orderId}
                  </th>
                <td className="px-3 h-auto md:px-6 py-6">
  {item.productsInfo && item.productsInfo.map((p, idx) => (
    <div key={idx}>{p.productName}</div>
  ))}
</td>
                  <td className="px-3 h-auto md:px-6 py-6">
                    {item.amount}
                  </td>
                  <td className="px-3 h-auto hover:text-pink-300 md:px-6 py-6">
                 <Link href={`/order?id=${item.orderId}`}>Details</Link>
                  </td>
                </tr>
                 })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}


export default Auth(orders)
