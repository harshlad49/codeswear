const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

 const OrderSchema = new mongoose.Schema({
email: {type: String, require: true},
products:[
  {
    productId: {type: String},
    quantity: {type: Number, default: 1}

  }],
  address: {type: String, require: true},
  amount: {type: Number, require: true},
  status: {type: String,default: 'Pending', require: true},
}, {Timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);