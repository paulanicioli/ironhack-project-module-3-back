const mongoose = require('mongoose');

const businessCategorySchema = new mongoose.Schema(
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

const BusinessCategory = mongoose.model(
  'BusinessCategory',
  businessCategorySchema
);

module.exports = BusinessCategory;
