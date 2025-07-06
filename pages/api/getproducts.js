import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import cors from "@/middleware/cors";
const handler = async (req, res)=>{
   await cors(req, res, () => {});
let products  = await Product.find() 

res.status(200).json({products})

}

export default connectDb(handler);