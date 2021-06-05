const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    business: { type: mongoose.Types.ObjectId, ref: 'Business' },
    productCategory: { type: mongoose.Types.ObjectId, ref: 'ProductCategory' },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    limitedSupply: { type: Boolean, default: false },
    remainingQuantity: { type: Number },
    price: {type: Number},
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
