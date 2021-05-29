const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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

const Review = mongoose.model('Order', reviewSchema);

module.exports = Review;
