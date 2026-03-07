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
        next(err)
    }
};

const getAllUsers = (_req, res, next) => {
    return User.find({}).select("-password") //hide password
    .then(users => {
        return res.status(200).send({
            message: "User retrieved successfully",
            users
        });
    })
    .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    return User.findByIdAndDelete(req.params.id)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        return res.status(200).send({
            message: "User deleted Successfully"
        });
    })
    .catch (err => next(err))
}

module.exports = {setAsAdmin,  getAllUsers, deleteUser}