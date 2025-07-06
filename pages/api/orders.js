import Order from '../../models/Order'; 
import connectDb from '../../middleware/mongoose';
import cors from "@/middleware/cors";
const handler = async (req, res) => {
  await cors(req, res, () => {});
  if (req.method === 'POST') {
    try {
      const { email, productsInfo, address, amount, status, paymentId, orderId,instate,city,pincode,phone,name } = req.body;

      const orderDetails = new Order({
        email,
        productsInfo,
        address,
        amount,
        status,
        paymentId,
        orderId,
        instate,city,pincode,phone,name
      });

      await orderDetails.save();
      res.status(200).json({ success: true, orderId: orderDetails.orderId  });
    } catch (err) {
      console.error('Error saving order:', err);
      res.status(500).json({ success: false, message: 'Failed to save order' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};

export default connectDb(handler);
