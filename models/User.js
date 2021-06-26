const mongoose = require('mongoose');
const LocationSchema = require('../models/subSchemas/Location');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      location: { type: LocationSchema, required: true}
    },
    imageUrl: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'business-manager', 'super-admin'],
      default: 'user',
    },
    business: { type: [mongoose.Types.ObjectId], ref: 'Business' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
