const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const {verify} = require('../middlewares/adminMiddleware');

// update user profile
router.patch('/profile/:id', verify, userController.updateProfile);
// get user bookings
router.get('/bookings/:id', verify, userController.getUserBookings);
// cancel user bookings
router.patch('/bookings/:id/cancel', verify, userController.cancelBooking);


module.exports = router;