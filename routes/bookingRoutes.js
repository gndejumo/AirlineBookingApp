const express = require('express')
const router = express.Router();
const bookingController = require ('../controllers/bookingController')
const {verify} = require('../middlewares/adminMiddleware');
const { validateObjectId } = require('../middlewares/validateObjectId');

router.post('/calculate', verify, bookingController.calculatePrice);
router.post('/payment', verify, bookingController.paymentProcessing);
router.post('/seatavail', verify, bookingController.checkSeatAvailability);
router.get('/:id', verify,validateObjectId, bookingController.getBookingById);
router.post('/', verify, bookingController.bookFlight);



module.exports = router;