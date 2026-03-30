const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {verify} = require('../middlewares/adminMiddleware');
const { validateObjectId } = require('../middlewares/validateObjectId');

// update user profile
router.patch('/profile/:id', verify,validateObjectId, userController.updateProfile);
router.delete('/bookings/:id/delete', verify, validateObjectId, userController.deleteBooking);
// get user bookings
router.get('/bookings/:id', verify,validateObjectId, userController.getUserBookings);
// cancel user bookings
router.patch('/bookings/:id/cancel', verify,validateObjectId, userController.cancelBooking);
router.post('/logout', verify, authController.logoutUser);
module.exports = router;