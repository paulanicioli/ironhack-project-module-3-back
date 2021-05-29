const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    imageUrl: { type: String },
    phoneNumber: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Businesses = mongoose.model('Business', businessSchema);

module.exports = Businesses;
