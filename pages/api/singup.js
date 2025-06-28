import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  await cors(req, res, () => {});
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Check if email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "Email is already registered." });
    }

    // Encrypt password and create new user
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString()
    });

    await u.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid request method." });
  }
};

export default connectDb(handler);
