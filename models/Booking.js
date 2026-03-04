const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookingSchema = new Schema ({
    user: { type: ObjectId, ref: "User" },
    flight: { type: ObjectId, ref: "Flight" },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["confirmed", "cancelled"] }
});


module.exports = mongoose.model('Booking', bookingSchema);
// model name: Booking
// collection : bookings