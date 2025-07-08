import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password, isAdmin } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "Email is already registered." });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();

    let u = new User({
      name,
      email,
      password: encryptedPassword,
      isAdmin: isAdmin || false 
    });

    await u.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid request method." });
  }
};

export default connectDb(handler);
