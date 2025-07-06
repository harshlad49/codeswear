import connectDb from "@/middleware/mongoose";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import cors from "@/middleware/cors";
const handler = async (req, res) => {
   await cors(req, res, () => {});
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Only POST method allowed" });
  }

  const { sendEmail, email, password, token } = req.body;

  if (sendEmail) {
  
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      await Forgot.findOneAndUpdate(
        { email },
        {
          userid: user._id.toString(),
          email,
          token,
        },
        { upsert: true, new: true }
      );

      
      // console.log(`🔗 Reset Link: https://yourdomain.com/forgot?token=${token}`);

      return res.status(200).json({ success: true, token });
    } catch (err) {
      console.error("Error while sending reset email:", err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }

  } else {
   
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
      user.password = encryptedPassword;
      await user.save();

      return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (err) {
      console.error("Error resetting password:", err);
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }
  }
};

export default connectDb(handler);
