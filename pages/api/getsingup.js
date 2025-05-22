import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res)=>{
let user  = await User.find() 

res.status(200).json({user})

}

export default connectDb(handler);