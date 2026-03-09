const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const {verify, verifyAdmin} = require('../middlewares/adminMiddleware');
const { validateObjectId } = require('../middlewares/validateObjectId');
// set user as an admin
router.patch('/setAsAdmin/:id', verify, verifyAdmin, adminController.setAsAdmin);
// get all users
router.get('/users', verify, verifyAdmin, adminController.getAllUsers);
// delete user
router.delete('/users/:id', verify, verifyAdmin,validateObjectId, adminController.deleteUser);


module.exports = router;






