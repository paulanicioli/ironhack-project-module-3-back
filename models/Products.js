const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    business: { type: mongoose.Types.ObjectId, ref: 'Business' },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    limitedSupply: { type: Boolean, default: false },
    remainingQuantity: { type: Number },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Product', productsSchema);

module.exports = Products;
