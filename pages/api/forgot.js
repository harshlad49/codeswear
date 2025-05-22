import connectDb from "@/middleware/mongoose";
import Forgot from "@/models/Forgot";
export default async function handler(req , res){

  
 let token = `sdfsdfsdfsd3454534`
 let forgot = new Forgot({
    email: req.body.email,
    token: token
 })
 let email = `We have sent you this email in response to your request to reset your password on Codeswear.com 


  <br/><br/>

  To reset your password for  please follow the link below:

<a href="https://codeswear.com/forgot?token=${token}">Click here to reset your password</a>

  <br/><br/>

  We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your . My Account Page and change your password.

  
  <br/><br/>`
 
  res.status(200).json({name: 'hfghfg'})
  console.log(router.query)
}