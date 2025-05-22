import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async  (req, res) => {
  if (req.method === 'POST') {
    const{ name , email } = req.body
      let u = new User({name, email, password: CryptoJS.AES.encrypt( req.body.password, "secret123").toString()})
      
  await u.save()
  JSON.stringify(req.body)
    
  res.status(200).json({ success: "success"})
  
  }
  else {

    res.status(400).json({ error: "false" })
    
  }
}

export default connectDb(handler);