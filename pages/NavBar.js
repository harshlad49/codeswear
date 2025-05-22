import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import { useRef  } from 'react'
import checkout from './checkout'
import {AiFillCloseCircle, AiFillMinusCircle, AiOutlineShoppingCart,AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import {MdAccountCircle, MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router';
import login from './login'
const NavBar = ({logout, user, cart,addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown , setDropdown] = useState(false)
 
  const router = useRouter();
  const toggleCard =() =>{
    if (ref.current.classList.contains('translate-x-full')){
    ref.current.classList.remove('translate-x-full')
    ref.current.classList.add('translate-x-0')
  }
  else if (!ref.current.classList.contains('translate-x-full')){
    ref.current.classList.remove('translate-x-0')
  ref.current.classList.add('translate-x-full')
  }
  }
  const ref = useRef()
  return (
    <div className='flex flex-col md:flex-row md:justify-start items-center justify-center py-2 shadow-md sticky top-0 z-10 bg-white'>
      <div className='logo mx-5 mr-auto md:mr-5'>
      <Link href={'/'}> <Image src="/logo.png" alt="" href="/" height={500} width={270} /> </Link>
      </div>
      <div className='nav'>
        <ul className='flex cursor-pointe  space-x-10 md:space-x-3 font-semibold   '>
        <Link href={'/tshirts'}><li className='hover:text-pink-600'>Tshirts</li> </Link>
        <Link href={'/hoodles'}><li className='hover:text-pink-600'>Hoodies</li></Link>
        <Link href={'/stickers'}><li className='hover:text-pink-600'>Stickers</li></Link>
        <Link href={'/mugs'}><li className='hover:text-pink-600'>Mugs</li></Link>
        </ul>
      </div>
      <div  className='card absolute right-10 pb-5 text-4  md:right-16 cursor-pointer  '>
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
      {dropdown &&<div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute font-semibold top-14 px-3 pb-2 rounded-md right-5 w-28  bg-white">
      <ul>
       <a href={'/myaccount'}> <li href={'/myaccount'} className='py-1 text-sm hover:text-pink-700'>My Account</li></a>
       <a href={'/orders'}> <li className='py-1 text-sm hover:text-pink-700'>Orders</li></a>
       <a onClick={logout}> <li className='py-1 text-sm hover:text-pink-700'>Logout</li></a>
      </ul>
     </div>}
      {user.value && <MdAccountCircle    className='px-3  md:pt-3  text-5xl  md:text-6xl' /> }
      </span>
      {!user.value && router.pathname !== '/login' &&(<Link href={"/login"}> 
        <button className='bg-pink-600 md:first-letter px-1 md:px-2 py-0.5 hover:text-black md:py-1 md:mt-3.5  rounded-md text-sm text-white mx-2'>Login</button> </Link>)}
      
      </div>
     <div  className='card absolute right-4 md:right-6 md:top-1  cursor-pointer'>
      <AiOutlineShoppingCart  onClick={toggleCard}    className='absolute md:top-1 text-xl   md:pb-1.5 bottom-[0.5px] right-0.5 md:text-4xl hover:text-pink-600' />
     </div>
    
     <div ref={ref} className={`w-72  h-[100vh] overflow-y-auto  sidecard absolute top-0 right-0 bg-pink-100 py-10 px-8
      transform transition-transform 
    ${Object.keys(cart).length !==0 ? 'translate-x-0': 'translate-x-full'} `}>
     <h2  className='font-bold text-xl text-center '>Shopping Card</h2>
     <span onClick={toggleCard} className='absolute  top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle/></span>
      <ol  className='list-decimal font-semibold'>
       {Object.keys(cart).length==0 && <div className='my-4 text-center fond-normal'>Your Card is empty!</div>} 
       {Object.keys(cart).map((k)=>{return  <li key={k}>
          
          <div className='item flex my-5'>
          <div className='w-2/3  font-semibold'>{cart[k].name}{cart[k].variant &&<div className='flex'>({cart[k].size}{cart[k].size &&<div>/</div>}{cart[k].variant})</div>}</div>
          <div className='flex items-center justify-center w-1/3 font-semibold text-sm'>
          <AiFillMinusCircle onClick={()=>{removeFromCart(k,1, cart[k].price,cart[k].name,cart[k].variant, cart[k].size)}} className='cursor-pointer text-pink-500'/> <span className='mx-2'>{cart[k].qty} </span> <AiFillPlusCircle onClick={()=>{addToCart(k,1, cart[k].price,cart[k].name,cart[k].variant, cart[k].size)}} className='cursor-pointer text-pink-500' /></div>
          </div>
        </li>})}
      </ol>
      <div className='flex my-2 '>
      <span className='font-semibold total'>Suntotal: ₹{subTotal}</span>
      </div>
      <div className='flex space-x-5'>
   <Link href={'/checkout'} >  <button   className="flex h-10  text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1 text-3'/> Checkout</button> </Link> 
      <button onClick={clearCart} className="flex h-10 w-32  text-white bg-pink-500 border-0 py-2 px-1 focus:outline-none hover:bg-pink-600 rounded text-sm"><MdDelete className='m-1'/>Clear Card</button>
      </div>
     </div>
    </div>
  
  )
}

export default NavBar
