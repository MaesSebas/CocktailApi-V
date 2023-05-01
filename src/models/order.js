const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cartitem = require('./cartitem');

const OrdersSchema = new mongoose.Schema({
  cartitems: [{
    type: Schema.Types.ObjectId,
    ref: 'Cartitem'
  }],
  orderid: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true
  },
  deliveryoption: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrdersSchema);

module.exports = Order;