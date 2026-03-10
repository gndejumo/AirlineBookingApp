const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Payment = require('../models/Payment');
// Book a flight
const bookFlight = (req, res, next) => {
    const {flightId, passengers} = req.body;
    
    if(!flightId) {
        return res.status(400).send({
            message: "Flight ID is required"
        });
    }
    if(!passengers || passengers < 1) {
        return res.status(400).send({
            message: "Passengers must be atleast 1"
        })
    }
    return Flight.findById(flightId).then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight ID not found"
            });
        }
        const totalPrice = flight.price * passengers;
        const newBooking = new Booking ({
            userId: req.user.id,
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
        let availability;
        if (flight.seats === 0){
            availability = "sold out"
                } else if (flight.seats < passengers) {
                    availability = "not enough seats"
                } else {
                    availability = "available"
                }
            return res.status(200).send({
                message: "Successfully caculated price",
                available: availability,
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


module.exports = {bookFlight, getBookingById, calculatePrice, checkSeatAvailability, paymentProcessing}