
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import  jsonwebtoken  from "jsonwebtoken";
const handler = async (req, res)=> {
  
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
        instate: req.body.instate,
      }
    );   
   

     const {name, email, address, instate, pincode, city, phone} = dbuser
  res.status(200).json({ name, email, address, instate, pincode, city, phone  });
  }else{
       res.status(400).json({ error: "error" })
  }
}
export default connectDb(handler);