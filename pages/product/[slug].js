import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImPower } from 'react-icons/im'
import { AiOutlineShoppingCart} from 'react-icons/ai'
const Post = ({ addToCart, product, variants, buyNow }) => {

  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes((pin))) {
      setService(true)
      toast.success('Your pin is serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

        });
    }
    else {
      setService(false)
      toast.error('Sorry! Pincode Not Serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  //  buyNow = ()=>{
    
  //   addToCart(slug, 1, product.price, product.title , size, product.color)
  //   router.push('/checkout')
  // }
  useEffect(() => {
        setColor(product.color)
        setSize(product.size)
  },[router.query])
  const onChangepin = (e) => {
    setPin(e.target.value)
  }


  const refreshVarant = (newsize, newcolor)=>{
    let url =`${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    // window.location = url;
    router.push(url)
  }

  return <>
    <div className='container px-2 py-14 sm:m-auto'>
   
    <section className="text-gray-600 body-font overflow-hidden">
    <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto bg-slate-50 py-10 shadow-lg flex flex-wrap">
          <img alt="ecommerce" className="lg:w-2/5 w-full lg:h-1/2 px-24 object-cover object-top rounded " src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
            <h1 className="text-gray-900  text-3xl title-font font-medium mb-1">{product.title} {product.color &&<div className="flex">({product.size}{product.size &&<div>/</div>}{product.color})</div>}</h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
             {product.color &&<div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button  onClick={()=>{refreshVarant(size, 'white')}}className={`border-2   bg-white-400 rounded-full w-6 h-6 focus:outline-none ${color === 'white'?'border-black': 'border-border-gray-300'}`}></button>}
                {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button  onClick={()=>{refreshVarant(size, 'black')}}className={`border-2  ml-1 bg-stone-900 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button  onClick={()=>{refreshVarant(size, 'green')}}className={`border-2  ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={()=>{refreshVarant(size, 'yellow')}} className={`border-2  ml-1 bg-yellow-300  rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('stone') && Object.keys(variants['stone']).includes(size) && <button onClick={()=>{refreshVarant(size, 'stone')}} className={`border-2  ml-1 bg-stone-400  rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={()=>{refreshVarant(size, 'purple')}} className={`border-2  ml-1 bg-purple-300  rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={()=>{refreshVarant(size, 'blue')}} className={`border-2  ml-1 bg-blue-950  rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={()=>{refreshVarant(size, 'pink')}} className={`border-2  ml-1 bg-pink-500  rounded-full w-6 h-6 focus:outline-none`}></button>}
              </div>}
              {product.size &&<div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                 <select value={size} onChange={(e)=>{refreshVarant(e.target.value, color)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                {Object.keys(variants[color]).includes('S') && <option>{'S'}</option>}
                {Object.keys(variants[color]).includes('M') && <option>{'M'}</option>}
                {Object.keys(variants[color]).includes('L') && <option>{'L'}</option>}
                {Object.keys(variants[color]).includes('XL') && <option>{'XL'}</option>}
                {Object.keys(variants[color]).includes('XXL') && <option>{'XXL'}</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>}
            </div>
            <div className="flex">
              <span className="title-font font-medium md:text-2xl text-lg  text-gray-900">₹ {product.price}</span>
              <div className="flex">
               <button
  onClick={() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Please login to continue', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      buyNow(slug, 1, product.price, product.title , size, product.color);
    }
  }}
  className="flex ml-4 text-white bg-pink-500 border-0 px-2  py-2 md:px-3 focus:outline-none hover:bg-pink-600 rounded text-center"
>
  <ImPower className="m-1 text-4" /> Buy Now
</button>

                <button onClick={() => { addToCart(slug, 1, product.price, product.title , size, product.color) }} className="flex ml-4 text-white bg-pink-500 border-0 px-2  py-2 md:px-3 focus:outline-none hover:bg-pink-600 rounded text-center"><AiOutlineShoppingCart className="m-1 text-5" />Add to Card</button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"><br />
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
            </div>

            <div className="pin mt-6 flex space-x-2 text-sm">
              <label htmlFor="Delivery & Services" className="font-bold text-xs h-10  md:text-xl">Delivery & Services</label>
              <input onChange={onChangepin}  placeholder="Pincode Ex: 394650" className="px-2  border-2 h-10 border-gray-400 rounded-md" type="text" />
              <button onClick={checkServiceability} className="flex ml-14 text-white bg-pink-500 h-10 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-center">Check</button>
            </div>
            {(!service && service != null) && <div className="text-red-700 text-sm mt-3">
              Sorry! we do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className="text-green-700 text-sm mt-3">
              Yay! This pincode is serviceable
            </div>}
          </div>
        </div>
      </div>
    </section>
    <div />
    </div>
  </>
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category })
  let coloSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(coloSizeSlug).includes(item.color)) {
      coloSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      coloSizeSlug[item.color] = {}
      coloSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }
  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(coloSizeSlug)) },
  }
}

export default Post

