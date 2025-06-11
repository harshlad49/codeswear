import { FaCity } from 'react-icons/fa';

const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

 const UserSchema  = new mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  address: {type: String, default: ''},
  city: {type: String, default: ''},
  instate: {type: String, default: ''},
  pincode: {type: Number, default: ''},
  phone: {type: Number, default: ''},
}, {Timestamps: true });
mongoose.models = {}
export default  mongoose.model("User", UserSchema);