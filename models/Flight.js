const mongoose = require ('mongoose');
const { Schema } = mongoose;

const flightSchema = new Schema ({
  flightNumber: String,
  origin: String,
  destination: String,
  departureDate: Date,
  arrivalDate: Date,
  price: Number,
  seats: Number
});

module.exports = mongoose.model('Flight', flightSchema);
// model name: Flight
// collection : flights