const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  })

  module.exports = LocationSchema;