const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
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

const Categories = mongoose.model('Category', categoriesSchema);

module.exports = Categories;
