const mongoose = require('mongoose');

const productCategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    businessCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'BusinessCategory',
    },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const ProductCategories = mongoose.model(
  'ProductCategory',
  productCategoriesSchema
);

module.exports = ProductCategories;
