import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import cors from "@/middleware/cors";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  await cors(req, res, () => {});

  if (req.method === "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(200).json({ success: false, error: "No user found" });
      }

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

      if (req.body.email === user.email && req.body.password === decryptedPass) {
        const payload = {
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin || false, 
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
          success: true,
          token,
          isAdmin: user.isAdmin || false,
        });
      } else {
        return res.status(200).json({ success: false, error: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
