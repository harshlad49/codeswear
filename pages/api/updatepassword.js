import connectDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import User from "@/models/User";
import cors from "@/middleware/cors";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  await cors(req, res, () => {});
  if (req.method == 'POST') {
    try {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });

      const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
      const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

     

      // Check if old password matches and new passwords are the same
      if (decryptedPass === req.body.password && req.body.npassword === req.body.cpassword) {
        await User.findOneAndUpdate(
          { email: user.email },
          {
            password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString(),
          }
        );

        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: "Password mismatch or invalid new passwords" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Bad request" });
  }
};

export default connectDb(handler);
