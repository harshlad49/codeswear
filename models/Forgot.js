const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

 const ForgotSchema  = new mongoose.Schema({
  userid: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  token: {type: String, require: true},
}, {Timestamps: true });
mongoose.models = {}
export default  mongoose.model("Forgot",ForgotSchema);