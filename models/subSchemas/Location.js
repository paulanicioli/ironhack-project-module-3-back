const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  })

  module.exports = LocationSchema;

//   { "address.location": {
//     $near: {
//       $geometry: {
//          type: "Point" ,
//          coordinates: [ -46.6509551 , -23.5652605 ]
//       },
//       $maxDistance: 500
//     }
//   }
// }