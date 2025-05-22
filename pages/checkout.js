import React from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiOutlineShoppingCart,AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa'
// import Head from 'next/head'
// import Script from 'next/script'
const checkout = ({cart,addToCart, removeFromCart, clearCart, subTotal }) => {
  return (
    <div className='container min-h-screen  px-2 sm:m-auto'>
      {/* <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <script type='application/javascript' crossorigin='anonymous' src={`${process.env.PAYTM_HOST}/merchantpgpui/checkout/merchants/${process.env.PAYTM_MID}.js`} onLoad="onScriptLoad();"/> */}
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl px-3'>1. Delivery Details</h2>

      <div className='mx-auto  flex px-6'>

        <div className=" w-1/2 mb-5 ">
          <div className="relative mb-6 px-2 ">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="relative mb-6 px-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <div className="px-6 w-full mb-5 ">
        <div className="relative mb-6 px-2 ">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea name="" id="" cols="30" rows="1" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>

      <div className='mx-auto flex px-6'>

        <div className=" w-1/2 mb-5 ">
          <div className="relative mb-6 px-2 ">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone No</label>
            <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className=" w-1/2 mb-5 ">
          <div className="relative mb-6 px-2 ">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className='mx-auto flex px-6'>

        <div className=" w-1/2 mb-5 ">
          <div className="relative mb-6 px-2 ">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className=" w-1/2 mb-5 ">
          <div className="relative mb-6 px-2 ">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>

      <h2 className='text-xl py-5 font-semibold px-3'>2. Review Card Items & Pay</h2>
      <div className=" sidecard  bg-pink-100 h-auto px-10 ">
     
      <ol className='list-decimal font-semibold'>
       {Object.keys(cart).length==0 && <div className='my-4 py-2 text-center fond-normal'>Your Card is empty!</div>} 
       {Object.keys(cart).map((k)=>{return  <li key={k}>
          <div className='item flex my-5'>
          <div className='font-semibold px-8 '>{cart[k].name}{cart[k].variant &&<div className='flex'>({cart[k].size}{cart[k].size &&<div>/</div>}{cart[k].variant})</div>}</div>
          <div className='flex  font-semibold  text-center'>
          <AiFillMinusCircle  onClick={()=>{removeFromCart(k,1, cart[k].price,cart[k].name,cart[k].variant, cart[k].size)}} className='cursor-pointer text-xl text-pink-500'/> <span text-sm="true" className='mx-2 text-sm'>{cart[k].qty} </span> <AiFillPlusCircle onClick={()=>{addToCart(k,1, cart[k].price,cart[k].name,cart[k].variant, cart[k].size)}} className='text-xl cursor-pointer text-pink-500' /></div>
          </div>
        </li>})}
        
      </ol>
      <div className='flex space-x-5'>
      <span className='font-semibold py-2 total'>Suntotal: ₹{subTotal}</span>
      </div>
      
    </div>
    <div className='py-10'>
   <Link href={"/order"}><button  className="flex ml-4 text-white bg-pink-500 border-0 px-1  py-2 md:px-3 focus:outline-none hover:bg-pink-600 rounded text-center"><FaLock className='m-1' /> Pay ₹{subTotal}</button></Link>
   </div>
    </div>
  )
}

export default checkout

