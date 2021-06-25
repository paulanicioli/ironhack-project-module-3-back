const mongoose = require('mongoose');
const LocationSchema = require('./subSchemas/Location')

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      location: { type: LocationSchema, required: true}
    },
    imageUrl: { type: String },
    phoneNumber: { type: String, required: true },
    timezone: { type: String },
    businessCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'BusinessCategory',
    },
    verified: { type: Boolean, default: false },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
