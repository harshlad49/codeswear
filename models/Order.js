
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

 const OrderSchema = new mongoose.Schema({
email: {type: String, require: true},
orderId: {type: String, require: true},
paymentsId:{type: String, require: true},
productsInfo:[
  {
    productName: {type: String},
    size:{type: String},
    variant:{type: String},
    quantity: {type: Number, default: 1},
    price:{type: Number}
  }],
  address: {type: String, require: true},
  city:{type: String, default:''},
  state:{type: String, default:''},
  phone:{type: Number, default:''},
  pincode:{type: Number, default:''},
  amount: {type: Number, require: true},
  status: {type: String,default: 'Pending', require: true},
}, {Timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);