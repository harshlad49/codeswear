// import React from "react";
// import { useRouter } from 'next/router';
// import Order from "../models/Order";
// import mongoose from "mongoose";

// const MyOrder = ({ order }) => {
// // const products = order.productsInfo

//   return (
//     <div>
//       <section className="text-gray-600 body-font overflow-hidden">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="lg:w-4/5 mx-auto flex flex-wrap">
//             <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
//               <h2 className="text-sm text-gray-500 tracking-widest uppercase">
//                 CodesWear.com
//               </h2>
//               <h1 className="text-gray-900 text-3xl font-medium mb-4">
//                 Order ID: #
//                 {order.orderId}
//               </h1>
//               <p className="text-gray-500">Your order has been successfully placed. Your Payment Status is: 
//               {order.status}
//               </p>
//                            {Object.keys(products).map((key) => (
//                 <div key={key} className="flex mb-4">
//                   <a className="flex-grow text-pink-500 border-b-2 border-pink-500 py-2 text-lg px-1">
//                     {products[key].productName} ({products[key].size}/{products[key].variant})
//                   </a>
//                   <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 mx-auto">
//                     {products[key].quantity}
//                   </a>
//                   <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 mx-auto">
//                     ₹{products[key].price}
//                   </a>
//                 </div>
//               ))}
          
//               <div className="flex border-t border-gray-200 py-2 ">
//                 <span className="text-gray-500 ">Wear-the code (XL, Red)</span>
//                 <span className="text-gray-500 mx-auto">1</span>
//                 <span className="ml-auto text-gray-900 mx-auto">$499</span>
//               </div>
             
//               <div>
//                 <div className="font-medium text-xl text-gray-900 py-3">
//                   SubTotal: ₹
//                   {order.amount}
//                 </div>
//                 <button className="ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
//                   Track Order
//                 </button>
//               </div>
//             </div>
//             <img
//               alt="ecommerce"
//               className="lg:w-1/3 m-auto w-full lg:h-auto h-64 object-cover object-center rounded"
//               src="https://dummyimage.com/400x400"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export async function getServerSideProps(context) {
//   try {
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI);
//     }

//     const id = context.query.orderId || context.query.id;

//     if (!id) {
//       return {
//         props: { order: null }, // no id passed, no order
//       };
//     }

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return {
//         props: { order: null }, // order not found
//       };
//     }

//     return {
//       props: { order: JSON.parse(JSON.stringify(order)) },
//     };
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return {
//       props: { order: null },
//     };
//   }
// }
// pages/myorder.js

import React from "react";
import mongoose from "mongoose";
import Order from "../models/Order";

const MyOrder = ({ order }) => {
  
  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Order Not Found</h2>
        <p className="text-gray-500 mt-4">
          We couldn’t find your order. Please check the link or try again later.
        </p>
      </div>
    );
  }

  const products = order.productsInfo || {};

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm text-gray-500 tracking-widest uppercase">
              CodesWear.com
            </h2>
            <h1 className="text-gray-900 text-3xl font-medium mb-4">
              Order ID: #{order.orderId}
            </h1>
            <p className="text-gray-500 mb-4">
              Your order has been successfully placed. Your Payment Status is:{" "}
              <strong>{order.status}</strong>
            </p>
             <div className="flex mb-2 border-b font-semibold text-sm sm:text-base">
  <div className="w-1/2 px-1 py-2">Item Description</div>
  <div className="w-1/4 px-1 py-2 text-center">Quantity</div>
  <div className="w-1/4 px-1 py-2 text-center">Item(s) Total</div>
</div>


{Object.keys(products).map((key) => (
  <div key={key} className="flex mb-3  pb-2 text-sm sm:text-base">

    <div className="w-1/2 px-1 py-1">
      {products[key].productName} ({products[key].size}/{products[key].variant})
    </div>

 
    <div className="w-1/4 px-1 py-1 text-center">
      {products[key].quantity}
    </div>

    <div className="w-1/4 px-1 py-1 text-center">
      ₹{products[key].price}
    </div>
  </div>
))}

            <div className="font-medium text-xl text-gray-900 py-3">
              SubTotal: ₹{order.amount}
            </div>
            <button className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
              Track Order
            </button>
          </div>
<img
  alt="ecommerce"
  className="w-[400px] h-[400px] object-cover object-center rounded m-auto"
  src="https://i.pinimg.com/736x/0a/ef/42/0aef423017fcdce078a864a0d1d50395.jpg"
/>

          
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const id = context.query.orderId || context.query.id;

    if (!id) {
      return {
        props: { order: null },
      };
    }

    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return {
        props: { order: null },
      };
    }

    return {
      props: { order: JSON.parse(JSON.stringify(order)) },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      props: { order: null },
    };
  }
}

export default MyOrder;
