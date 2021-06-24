const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Business',
    },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    business: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Business',
    },
    products: { type: [mongoose.Types.ObjectId], ref: 'Product' },
    quantities: { type: [Number] },
    comments: { type: [String] },
    completed: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
