const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Business',
    },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, 
    products: { type: [mongoose.Types.ObjectId], ref: 'Product' },
    quantities: { type: [Number] },
    //Salvaremos os incompletos no banco de dados?
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
