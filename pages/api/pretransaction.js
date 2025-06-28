import Product from '@/models/Product';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  if(req.method == 'POST') {
 let product, sumTotal=0;
 let cart = req.body.cart;

for (let item in cart) {
    sumTotal += cart[item].price * cart[item].qty;
    product = await Product.findOne({ slug: item });
    if(product.availableQty < cart[item].qty){
    res.status(200).json({ success: false, error: "some items in your card are out of stock. Please try again" });}
    if (product.price != cart[item].price) {
        res.status(200).json({ success: false, error: "The price of some item in your card have changed.Please try again" });
        return;
    }
}
  }
  const { subTotal, orderId, email, address, products } = req.body;

  if (!subTotal || subTotal <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid amount' });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const payment = await razorpay.orders.create({
      amount: subTotal * 100, // amount in paise
      currency: 'INR',
      receipt: orderId.toString(),
    });

    res.status(200).json({
      success: true,
      orderId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (err) {
    // console.error('Error creating Razorpay order:', err);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
  }
}
