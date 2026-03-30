const Flight = require('../models/Flight');


const getAllFlights = (_req, res, next) => {
    return Flight.find({})
    .then((flights) => res.send({flights: flights}))
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

const createFlight = async (req, res, next) => {
  try {
    const {
      flightNumber,
      origin,
      destination,
      departureDate,
      arrivalDate,
      price,
      seats
    } = req.body;

    // REQUIRED FIELDS
    if (!flightNumber || !origin || !destination || !departureDate || !arrivalDate || price == null || seats == null) 
        {
      return res.status(400).send({
        message: "All fields are required"
      });
    }

    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);

    // VALID DATE CHECK
    if (isNaN(departure) || isNaN(arrival)) {
      return res.status(400).send({
        message: "Invalid date format"
      });
    }

    // LOGIC CHECK
    if (arrival <= departure) {
      return res.status(400).send({
        message: "Arrival must be after departure"
      });
    }

    // CREATE FLIGHT
    const newFlight = new Flight({
      flightNumber,
      origin,
      destination,
      departureDate,
      arrivalDate,
      price,
      seats
    });

    const savedFlight = await newFlight.save();

    return res.status(201).send({
      message: "Flight created successfully",
      flight: savedFlight
    });

  } catch (err) {
    next(err);
  }
};

const updateFlight = (req, res, next) => {
    const {
        flightNumber, 
        origin, 
        destination,
        departureDate,
        arrivalDate, 
        price,
        seats} = req.body

    const updatedFlight = {
        flightNumber,
        origin,
        destination,
        departureDate,
        arrivalDate,
        price,
        seats
    };
    console.log(updatedFlight);
    return Flight.findByIdAndUpdate(req.params.id, updatedFlight, {returnDocument: 'after', runValidators: true})
    .then(flight => {
        if (!flight) {
            return res.status(404).send({
                message: "Flight not found"
            })
        }
            return res.status(200).send({
                message: "Successfully updated flight(s)",
                flight
            })
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

const getAvailableFlights = async (req, res, next) => {
  try {
    const now = new Date();
    const flights = await Flight.find({ departureDate: { $gt: now } });
    res.status(200).send({ flights });
  } catch (err) {
    next(err);
  }
};
// Fetch departed flights (for history)
const getPastFlights = async (req, res, next) => {
  try {
    const now = new Date();
    const flights = await Flight.find({ departureDate: { $lte: now } });
    res.status(200).send({ flights });
  } catch (err) {
    next(err);
  }
};

module.exports = {getAllFlights, getFlightById, searchFlights, filterFlights, getAvailableSeats,createFlight, updateFlight, deleteFlight, getAvailableFlights,getPastFlights }