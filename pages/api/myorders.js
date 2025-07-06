import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose"; 
import jsonwebtoken from "jsonwebtoken"
import cors from "@/middleware/cors";
const handler = async (req, res) => {
   await cors(req, res, () => {});
  const token = req.body.token
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
 
  let orders = await Order.find({email: data.email})
  res.status(200).json({ orders})
}
export default connectDb(handler);
