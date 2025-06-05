import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  let order
  if (req.body.STATUS == 'TEN_SUCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERTD }, { status: 'paid', paymentInfo: JSON.stringify(req.body) })
    let Products = order.Products
    for (let slug in Products) {
      await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - Products[slug].qty} })
    }

  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'pending', paymentInfo: JSON.stringify(req.body) })
  }

  res.redirect('/order?id=' + order._id, 200)
}

export default connectDb(handler)



