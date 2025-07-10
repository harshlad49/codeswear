import React, { useState, useEffect } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Auth/Auth';
const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const router = useRouter();
   
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [phone , setPhone] = useState('');
  const [pincode , setPincode] = useState('');
  const [instate , setinstate] = useState('');
  const [address , setAddress] = useState('');
  const [city , setCity] = useState('');
  const [disable, setDisable] =useState(true);
  useEffect(() => {
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    setEmail(storedEmail);
  }
}, []);

  const handleChange = async (e)=>{
    
    if(e.target.name == 'name'){
      setName(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name == 'pincode'){
      setPincode(e.target.value)
      
      if(e.target.value.length == 6) {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if(Object.keys(pinJson).includes(e.target.value)){
      setinstate(pinJson[e.target.value][1])
      setCity(pinJson[e.target.value][0])
    }else{
      setinstate('')
      setCity('')
    }
    } else{
      setinstate('')
      setCity('')
    }
    }
    else if(e.target.name == 'instate'){
      setinstate(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }
    else if(e.target.name == 'city'){
      setCity(e.target.value)
    }

    if( name.trim() &&
  email.trim() &&
  address.trim() &&
  phone.trim() &&
  pincode.trim()  ) {
      setDisable(false);
    }else {
      setDisable(true)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert('Razorpay SDK failed to load.');
    return;
  }


  const orderId = Math.floor(Math.random() * Date.now());

 
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subTotal,
    orderId,
    email,
    address,
    productsInfo: Object.values(cart), 
  }),
  
});

  const data = await response.json();
  // console.log('Response from pretransaction API:', data);

  if (!data.success) {
    alert(data.message || 'Failed to create payment order');
    return;
  }

  
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: data.amount,
    currency: data.currency,
    name: 'Your Shop',
    description: 'Thank you for shopping',
    order_id: data.orderId,  
     callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
    handler: function(response) {
   toast.success('✅ Payment successful!');


const orderDetails = {
    email,
    productsInfo: Object.keys(cart).map(k => ({
      productName: cart[k].name,
      size: cart[k].size,
      variant: cart[k].variant,
      quantity: cart[k].qty,
      price: cart[k].price
    })),
    address,
    city,
    instate,
    pincode,phone,name,
    amount: subTotal,
    status: response.razorpay_payment_id ? 'paid' : 'pending',
    paymentId: response.razorpay_payment_id,
    orderId: data.orderId
  };

  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem('orderDetails', JSON.stringify({
          order_id: data.orderId,
          pcard: cart,
          psubTotal: subTotal,
          paymentId: response.razorpay_payment_id
        }));
        clearCart();
        router.push(`/order?id=${data.orderId}`);
      } else {
        toast.error('Failed to save order');
      }
    })
    .catch(() => {
      toast.error('Error saving order');
    });
},
    prefill: {
      name: 'Harshlad',
      email: 'Harshlad492002@.com',
      contact: '9313391406',
    },
    theme: {
      color: '#F37254',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};



  return (
    <div className='container min-h-screen px-2 sm:m-auto'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0'
        />
      </Head>

      <Script src='https://checkout.razorpay.com/v1/checkout.js' strategy='lazyOnload' />
      <ToastContainer position="top-center" autoClose={3000} />

      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl px-3'>1. Delivery Details</h2>

      <div className='mx-auto  flex px-6'>
        <div className='w-1/2 mb-5'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='name' className='leading-7 text-sm text-gray-600'>
              Name
            </label>
            <input
             onChange={handleChange}
             value={name}
              type='text'
              id='name'
              name='name'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>

        <div className='px-2 w-1/2'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='email' className='leading-7 text-sm text-gray-600'>
              Email
            </label>
            <input
             onChange={handleChange}
             value={email}
             readOnly
              type='email'
              id='email'
              name='email'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>
      </div>

      <div className='px-6 w-full mb-5'>
        <div className='relative mb-6 px-2'>
          <label htmlFor='address' className='leading-7 text-sm text-gray-600'>
            Address
          </label>
         <textarea
  onChange={handleChange}
  value={address}
  name='address'
  id='address'
  cols='10'
  rows='2'
  className='w-full bg-white rounded border border-gray-300 ...'
></textarea>

        </div>
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='phone' className='leading-7 text-sm text-gray-600'>
              Phone No
            </label>
            <input
             onChange={handleChange}
             value={phone}
              type='text'
              id='phone'
              name='phone'
              maxLength={10}
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>
        <div className='w-1/2 mb-5'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='pincode' className='leading-7 text-sm text-gray-600  autoComplete="off"'>
              Pincode
            </label>
            <input
             onChange={handleChange}
             value={pincode}
              type='text'
              id='pincode'
              name='pincode'
              maxLength={6}
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>
        
      </div>

      <div className='mx-auto flex px-6'>
        <div className='w-1/2 mb-5'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='city' className='leading-7 text-sm text-gray-600'>
              City
            </label>
            <input
             onChange={handleChange}
             value={city}
              type='text'
              id='city'
              name='city'
              readOnly
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>

        <div className='w-1/2 mb-5'>
          <div className='relative mb-6 px-2'>
            <label htmlFor='state' className='leading-7 text-sm text-gray-600'>
              State
            </label>
            <input
               onChange={handleChange}
             value={instate}
              type='text'
              id='instate'
              name='instate'
              readOnly
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
        </div>
      </div>

      <h2 className='text-xl py-5 font-semibold px-3'>2. Review Cart Items & Pay</h2>

      <div className='sidecard bg-pink-100 h-auto px-10 py-4'>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && (
            <div className='my-4 py-2 text-center font-normal'>Your Cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className='item flex my-5 justify-between items-center'>
                <div className='font-semibold px-2'>
                  {cart[k].name}
                  {cart[k].variant && (
                    <span className='text-sm text-gray-600 ml-2'>
                      ({cart[k].size}
                      {cart[k].size && cart[k].variant && '/'}
                      {cart[k].variant})
                    </span>
                  )}
                </div>
                <div className='flex items-center text-pink-500'>
                  <AiFillMinusCircle
                    onClick={() =>
                      removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size)
                    }
                    className='cursor-pointer text-xl'
                  />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size)
                    }
                    className='cursor-pointer text-xl'
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className='flex justify-between py-2 font-semibold'>
          <span>Subtotal: ₹{subTotal}</span>
        </div>
      </div>

      <div className='py-10 px-4'>
        <button disabled={disable}
          onClick={handleRazorpayPayment}
          className='flex disabled:bg-pink-300 items-center text-white bg-pink-500 border-0 px-4 py-2 focus:outline-none hover:bg-pink-600 rounded'
        >
          <FaLock className='mr-2' />
          Pay ₹{subTotal}
        </button>
      </div>
    </div>
  );
};

export default Auth(Checkout);
