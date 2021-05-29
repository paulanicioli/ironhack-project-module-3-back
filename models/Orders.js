const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Business',
    },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    products: { type: [mongoose.Types.ObjectId], ref: 'Product' },
    quantities: { type: [Number] },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('Order', ordersSchema);

module.exports = Orders;
