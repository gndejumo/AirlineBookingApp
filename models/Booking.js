const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    flightId: {
        type: Schema.Types.ObjectId,
        ref: "Flight",
        required: true
    },
    passengers: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed"
    }
});


module.exports = mongoose.model('Booking', bookingSchema);
// model name: Booking
// collection : bookings