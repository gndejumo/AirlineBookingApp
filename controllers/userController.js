const Booking = require('../models/Booking');
const User = require('../models/User');

const updateProfile = (req, res, next) => {
    const {firstName, lastName, email} = req.body

    const updates = {
        firstName,
        lastName,
        email
    }
    console.log(updates)
    return User.findByIdAndUpdate(req.user.id, updates, {new: true})
    .select('-password')
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        return res.status(200).send({
            message: "Update the profile successfully",
            user
        })
    })
    .catch(err => next(err))
}

// Get all booking of the logged in user
const getUserBookings = (req, res, next) => {
    return Booking.find({ userId: req.user.id}).populate('flightId')
    .then(bookings => {
        return res.status(200).send({
            message: "User booking retrieved successfully",
            bookings
        })
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


module.exports = {updateProfile, getUserBookings, cancelBooking}