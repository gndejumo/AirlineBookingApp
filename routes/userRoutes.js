const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController')
const {verify} = require('../middlewares/authMiddleware');


router.get('/profile', verify, userController.getProfile);
router.put('/profile', verify, userController.getProfile);
router.get('/bookings', verify, bookingController.getUserBookings);