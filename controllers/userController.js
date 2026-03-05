// const bcrypt = require('bcrypt');
// const auth = require('../middlewares/authMiddleware');
// const {errorHandler} = require('../middlewares/adminMiddleware')
const User = require('../models/User');


const setAsAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin"},
            { new: true} //return true if updated document
        );
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).send({
                message: "User not found."
            });
        } return res.status(200).send({
            message: "Successfully update to admin user.",
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                role: updatedUser.role
            }
            
        });
    } catch (err) {
        return res.status(500).send({
            message: "Server error", 
            err: err.message
        });
    }
};

module.exports = {setAsAdmin}