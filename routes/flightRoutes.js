const express = require('express')
const router = express.Router();
const flightController = require ('../controllers/flightController')
const {verify, verifyAdmin} = require('../middlewares/adminMiddleware');


// get all flights
router.get('/', flightController.getAllFlights)
// get flight by Id
router.get('/:id', flightController.getFlightById)
// get available seats
router.get('/:id/seats', flightController.getAvailableSeats)
// search flights
router.get('/search', flightController.searchFlights)
// filter flights
router.get('/filter', flightController.filterFlights)
// create flight
router.post('/,', verify, verifyAdmin, flightController.createFlight)
// update flight
router.patch('/:id', verify, verifyAdmin, flightController.updateFlight)
// delete flight
router.delete('/id', verify, verifyAdmin, flightController.deleteFlight)
// get all flight

module.exports = router;