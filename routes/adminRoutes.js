const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const {verify, verifyAdmin} = require('../middlewares/adminMiddleware');
const { validateObjectId } = require('../middlewares/validateObjectId');


// set user as an admin
router.patch('/setAsAdmin/:id', verify, verifyAdmin, adminController.setAsAdmin);
// set admin as an regular user
router.patch('/makeUser/:id', verify, verifyAdmin, adminController.makeUser);
// get all users
router.get('/users', verify, verifyAdmin, adminController.getAllUsers);
// get all bookings
router.get('/bookings', verify, verifyAdmin,adminController.getAllBookings )
// delete user
router.get('/dashboard-stats', verify, verifyAdmin, adminController.getDashboardStats);
router.delete('/users/:id', verify, verifyAdmin,validateObjectId, adminController.deleteUser);
router.delete('/bookings/:id/cancel', verify, verifyAdmin,validateObjectId, adminController.cancelBookingAdmin);

module.exports = router;






