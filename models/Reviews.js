const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Business',
    },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model('Order', reviewsSchema);

module.exports = Reviews;
