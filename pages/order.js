import React from 'react'

function order({cart,addToCart, removeFromCart, clearCart, subTotal}) {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Orger Id: #45334</h1>
        <div className="flex mb-4">
          <a className="flex-grow border-gray-300 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg items-end text-right">Quantity</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg items-end text-right ">Item Total</a>
        </div>
        <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">weare the code(Xl,Red)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">₹499</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">weare the code(Xl,Red)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">₹499</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">weare the code(Xl,Red)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">₹499</span>
        </div>
        <div className="flex m-6">
          <span className="title-font font-medium text-2xl text-gray-900">Total: ₹{subTotal}</span>
          <button className="flex ml-auto  text-white  bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
    </div>
  )
}

export default order
