const mongoose = require('mongoose');

const businessCategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const BusinessCategories = mongoose.model(
  'BusinessCategory',
  businessCategoriesSchema
);

module.exports = BusinessCategories;
