const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');
const {verify} = require('../middlewares/authMiddleware');


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('profile', verify, authController.getProfile )

module.exports = router;
