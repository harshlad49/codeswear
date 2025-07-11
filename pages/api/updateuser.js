
import connectDb from "@/middleware/mongoose";
import  jsonwebtoken  from "jsonwebtoken";
import User from "@/models/User";
import cors from "@/middleware/cors";
const handler = async (req, res)=> {
  await cors(req, res, () => {});
  if(req.method == 'POST'){
    let token = req.body.token
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
let dbuser = await User.findOneAndUpdate(
  { email: user.email },
  {
    address: req.body.address, 
    city: req.body.city,
    pincode: req.body.pincode,
    phone: req.body.phone,
    name: req.body.name,
    instate: req.body.instate
  }
);   

  res.status(200).json({ success: true });
  }else{
       res.status(400).json({ error: "error" })
  }
}
export default connectDb(handler);