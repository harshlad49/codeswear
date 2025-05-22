import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";
import mongoose from "mongoose";
const hoodles = ({products}) => {
  return (
    <div className='constainer px-2 sm:m-auto items-center '>
      <section className="text-gray-600 body-font ">
        <div className=" pl-28 overflow-x-hidden py-10 mx-auto bg-slate-50  ">
          <div className="flex flex-wrap -m-4 items-center justify-center  ">
            {Object.keys(products).length === 0 && <p>Sorry all thr Hoodies are currently out of stock. New stock is coming soon!</p>}

              {Object.keys(products).map((item)=>{
                 
                 return<Link passHref={true}  key={products[item]._id} href={`/product/${products[item].slug}`} ><div className=" md:w-4/5  px-10 p-2 w-full py-5  shadow-lg m-5 bg-white"> 
                 
                  <div  className="block relative rounded overflow-hidden  ">
                <img alt="ecommerce" className="h-[50vh]   block items-center cursor-pointer" src={products[item].img} />
              
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs  tracking-widest title-font mb-1">{products[item].category} </h3>
                  <h2 className="text-gray-900 title-font w-66 h-14 text-sm md:text-lg  font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('S')  && <span className='border border-gray-300 px-1 mx-1 '>S</span>}
                    {products[item].size.includes('M')  && <span className='border border-gray-300 px-1 mx-1 '>M</span>}
                    {products[item].size.includes('L')  && <span className='border border-gray-300 px-1 mx-1 '>L</span>}
                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1 '>XL</span>}
                    {products[item].size.includes('XXL')&& <span className='border border-gray-300 px-1 mx-1 '>XXL</span>}
                    </div>
                    <div className="mt-1">
                    {products[item].color.includes('white') && <button className="border-2 border-gray-400 ml-1 bg-zinc-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-stone-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-950 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('stone') && <button className="border-2 border-gray-300 ml-1 bg-stone-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-950 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                </div>
                
              </div> 
              </div>
              </Link> })}
           </div>
        </div>
       
      </section >
    </div >
  )
}
export async function getServerSideProps(context){
  if (!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products  = await Product.find({category: 'Hoodies'})
  let hood = {}
  for(let item of products){
  if(item.title in hood){
    if(!hood[item.title].color.includes(item.color) && item.availableQty > 0){
      hood[item.title].color.push(item.color)
    }
    if(!hood[item.title].size.includes(item.size) && item.availableQty > 0){
      hood[item.title].size.push(item.size)
  }
}
  else{
    hood[item.title] = JSON.parse(JSON.stringify(item))
    if(item.availableQty > 0){
      hood[item.title].color = [item.color]
      hood[item.title].size = [item.size]
    }
  }
  }
  return{
    props: {products: JSON.parse(JSON.stringify(hood))},
  }
}

export default hoodles
