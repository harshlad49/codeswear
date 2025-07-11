
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import cors from "@/middleware/cors";
const handler = async  (req, res) => {
  await cors(req, res, () => {});
  if (req.method === 'POST') {
    console.log(req.body)
    for (let i=0; i< req.body.length; i++){
    let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
      
    }
    JSON.stringify(req.body) 
  res.status(200).json({ success: "success"})
  }
  else {

    res.status(400).json({ error: "This method is not allowed" })
    
  }
}

export default connectDb(handler);