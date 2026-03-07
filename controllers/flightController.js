const Flight = require('../models/Flight');


const getAllFlights = (_req, res, next) => {
    return Flight.find({})
    .then((flights) => res.send(flights))
    .catch(err => next(err));
}

const getFlightById = (req, res, next) => {
    return Flight.findById(req.params.id)
    .then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight not found."
            })
        }
        return res.status(200).send(flight);
    })
    .catch(err => next(err));
}

const createFlight = (req, res, next) => {
    const {flightNumber, origin, destination,departureDate, arrivalDate, seats, price } = req.body
    const newFlight = new Flight ({
        flightNumber,
        origin,
        destination,
        departureDate,
        arrivalDate,
        price,
        seats
    });
    return newFlight.save().then((flight) => res.status(201).send(flight))
    .catch(err => next(err))
}

const updateFlight = (req, res, next) => {
    const {origin, destination, price} = req.body

    const updatedFlight = {
        origin,
        destination,
        price
    }
    console.log(updatedFlight);
    return Flight.findByIdAndUpdate(req.params.id, updatedFlight, {new: true, runValidators: true})
    .then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight not found"
            })
        }
            return res.status(200).send(flight)
    })
    .catch(err => next(err));
}

const deleteFlight = (req, res, next) => {
    return Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight not found"
            })
        }
            return res.status(200).send({
                message: "Flight Deleted!"
            })
    })
    .catch(err => next(err));
}

const searchFlights = (req, res, next) => {
    const {origin, destination} = req.query;
    return Flight.find({
        ...(origin && {origin: { $regex: origin, $options: 'i'}}),
        ...(destination && {destination: { $regex: destination, $options: 'i'}})
    })
    .then(flights => res.status(200).send({
        message: "Matching flights retrieved successfully",
        flights
    }))
    .catch(err => next(err))
}

const filterFlights = (req, res, next) => {
    const {minPrice, maxPrice} = req.query;
    let filter = {};
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    return Flight.find(filter).then(flights => res.status(200).send({
        message: "Filtered flights retrieved successfully",
        flights
    }))
    .catch(err => next(err))
}

const getAvailableSeats = (req, res, next) => {
    return Flight.findById(req.params.id).then(flight => {
        if(!flight) {
            return res.status(404).send({
                message: "Flight not found"
            })
        }
        return res.status(200).send({
            message: "Available seats retrieved successfully",
            availableSeats: flight.seats
        })
    })
    .catch(err => next(err));
}

module.exports = {getAllFlights, getFlightById, searchFlights, filterFlights, getAvailableSeats,createFlight, updateFlight, deleteFlight,}