const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');
const {verify} = require('../middlewares/adminMiddleware');


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', verify, authController.getProfile )

module.exports = router;