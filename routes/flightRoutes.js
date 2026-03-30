const express = require('express')
const router = express.Router();
const flightController = require ('../controllers/flightController')
const {verify, verifyAdmin} = require('../middlewares/adminMiddleware');
const { validateObjectId } = require('../middlewares/validateObjectId');

// get all flights
router.get('/', flightController.getAllFlights)
// search flights
router.get('/search', flightController.searchFlights)
// filter flights
router.get('/filter', flightController.filterFlights)
// get flight by Id
router.get('/:id', validateObjectId, flightController.getFlightById)
// get available seats
router.get('/:id/seats',validateObjectId, flightController.getAvailableSeats)
// get the available flights not yet departed
router.get('/available', flightController.getAvailableFlights);
// get past flight already departed
router.get('/history', flightController.getPastFlights);
// create flight
router.post('/', verify, verifyAdmin, flightController.createFlight)
// update flight
router.patch('/:id', verify, verifyAdmin,validateObjectId, flightController.updateFlight)
// delete flight
router.delete('/:id', verify, verifyAdmin,validateObjectId, flightController.deleteFlight)

module.exports = router;