import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose"; 

const handler = async (req, res) => {
  let order
if(req.body.STATUS == 'TEN_SUCESS'){
  order = await Order.findOneAndUpdate({orderId: req.body.ORDERTD}, {status: 'paid', paymentInfo: JSON.stringify(req.body)})

} else if (req.body.STATUS == 'PENDING'){
 order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status: 'pending', paymentInfo: JSON.stringify(req.body)})
}

res.redirect('/order?id=' + order._id, 200)
}

export default connectDb(handler)
// import Order from "@/models/Order";
// import connectDb from "@/middleware/mongoose";

// const handler = async (req, res) => {
//   try {
//     const { STATUS, ORDERID } = req.body;

//     let updatedOrder;

//     if (STATUS === 'TEN_SUCCESS') {
//       updatedOrder = await Order.findOneAndUpdate(
//         { orderId: ORDERID },
//         { status: 'paid', paymentInfo: JSON.stringify(req.body) },
//         { new: true }
//       );
//     } else if (STATUS === 'PENDING') {
//       updatedOrder = await Order.findOneAndUpdate(
//         { orderId: ORDERID },
//         { status: 'pending', paymentInfo: JSON.stringify(req.body) },
//         { new: true }
//       );
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid status' });
//     }

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     res.redirect(302, `/order?id=${updatedOrder._id}`); // Use 302 for redirection
//   } catch (err) {
//     console.error('Error updating payment status:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// export default connectDb(handler);
