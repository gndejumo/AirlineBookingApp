
const createFlights = (req, res, next) => {
    const {flightNumber, origin, destination,departureDate, arrivalDate, seats, price } = req.body
    const newFlight = new Flight ({
        flightNumber,
        origin,
        destination,
        departureDate,
        arrivalDate,
        seats,
        price
    });
    return newFlight.save().then((flight) => res.status(201).send(flight))
    .catch(err => next(err))
}
const getAllFlights = (req, res, next) => {
    return Flight.find({})
    .then((flights) => res.send(flights))
    .catch(err => next(err));
}

const getFlightById = (req, res, next) => {
    return Flight.findById(req.params.id)
    .then(flight => res.send(flight))
    .catch(err => next(err));
}

const updateFlight = () => {
    const {origin, destination, price} = req.body

    const updatedFlight = {
        origin,
        destination,
        price
    }
    console.log(updatedFlight);
    return Flight.findByIdAndUpdate(req.params.id, updatedFlight, {new: true})
    .then(flight => res.send(flight))
    .catch(err => next(err));
}

const deleteFlight = (req, res, next) => {
    return Flight.findByIdAndDelete(req.params.id)
    .then(() => res.send({
        message: "Flight Deleted!"
    }))
    .catch(err => next(err));
}

const searchFlights = () => {

}

const filterFlights = () => {
    
}

const getAvailableSeats = () => {
    
}

module.exports = {createFlights, getAllFlights, getFlightById, updateFlight, deleteFlight, searchFlights, filterFlights, getAvailableSeats}