const express = require('express')
const router = express.Router();
const flightController = require('../controllers/flightController')
const adminController = require('../controllers/adminController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware');


router.patch('/admin/setAsAdmin/:id', verify, verifyAdmin, adminController.setAsAdmin);
router.get('/admin/getAllUsers', verify, verifyAdmin, adminController.getAllUsers);
router.patch('admin/createFlight', verify, verifyAdmin, flightController.createFlight)
router.patch('admin/updateFlight/:id', verify, verifyAdmin, flightController.updateFlight)
router.delete('admin/deleteFlight/:id', verify, verifyAdmin, flightController.deleteFlight)