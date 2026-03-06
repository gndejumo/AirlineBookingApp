const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Book a flight
const bookFlights = (req, res, next) => {
    const {flightId, passengers} = req.body;
    
    if(!flightId) {
        return res.status(400).send({
            message: "Flight ID is required"
        });
    }
    if(!passengers || !passengers < 1) {
        return res.status(400).send({
            message: "Passenger must be atleast 1"
        })
    }
    return Flight.findByID.then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight ID not found"
            });
        }
        const totalPrice = flight.price * passengers;
        const newBooking = new Booking ({
            userID: req.user.id,
            flightId: flightId,
            passengers: passengers,
            totalPrice: totalPrice
        })
        console.log(newBooking);
        return newBooking.save();
    })
    .then(booking => {
        if(!booking) return;
        return res.status(201).send({
            message: "Flight booked successfully",
            booking
        })
    })
    .catch(err => next(err));
}
// Get all booking of the logged in user
const getUserBookings = (req, res, next) => {
    return Booking.findById({userId: req.user.id}).populate('flightId').then(bookings => {
        return res.status(200).send({
            message: "User bookings retrieved successfully",
            bookings
        });
    })
    .catch(err => next(err));
}

// Get booking ID
const getBookingById = (req, res, next) => {
        return Booking.findById(req.params.id).populate('flightId')
    .populate('userId', '-password')
    .then(booking => {
        if (!booking) {
            return res.status(404).send({
                message: "Booking not found"
            });
        }
            return res.status(200).send({
                message: "Booking retrieved successfuly",
                booking
            });
    })
    .catch(err => next(err));
}

//Cancel booking
const cancelBooking = (req, res, next) => {
    return Booking.findById(req.params.id)
    .then(booking => {
        if(!booking) {
            return res.status(404).send({
                message: "Booking not found"
            })
        }
        booking.status = "cancelled"
        return booking.save();
    })
    .then(updatedBooking => {
        console.log(updatedBooking);
        return res.status(200).send({
            message: "Booking cancelled successfully!",
            booking: updatedBooking
        })
    })
    .catch(err => next(err));
}

const calculatePrice = (req, res, next) => {
    const {flightId, passengers} = req.body;
    return Flight.findById(flightId)
    .then(flight => {
        if(!flight) {
            return res.status(400).send({
                message: "Flight not found"
            })
        }
            const totalPrice = flight.price * passengers
            console.log(totalPrice);
            return res.status(200).send({
                message: "Successfully caculated price",
                totalPrice
            })
    })
    .catch(err => next(err))
}
const checkSeatAvailability = (req, res, next) => {
    const {flightId, passengers} = req.body;
    return Flight.findById(flightId)
    .then(flight => {
        if(!flight) {
            return res.status(400).send({
                message: "Flight not found"
            })
        }
            return res.status(200).send({
                message: "Successfully caculated price",
                available: flight.seats >= passengers,
                availableSeats: flight.seats
            })
    })
    .catch(err => next(err))
}

const paymentProcessing = (req, res, next) => {
    const {bookingId, amount} = req.body

    const payment = new Payment({
        bookingId,
        amount,
        status: "paid"
    })

    return payment.save().then(result => {
        res.status(200).send({
            message: "Payment successfull!",
            payment: result
        })
    })
    .catch(err => next(err));
}


module.exports = {bookFlights,getUserBookings, getBookingById, cancelBooking, calculatePrice, checkSeatAvailability, paymentProcessing}