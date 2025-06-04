import Razorpay from 'razorpay';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount,
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };

    try {
      const order = await instance.orders.create(options);
      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating Razorpay order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
