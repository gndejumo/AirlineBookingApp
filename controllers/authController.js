const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middlewares/authMiddleware');
const {errorHandler} = auth


const setAsAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: role === "admin"},
            { new: true} //return true if updated document
        );
        if (!updatedUser) {
            return res.status(404).send({
                message: "User not found."
            });
        } return res.status(200).send({
            message: "Successfully update to admin user."
        });
    } catch (err) {
        return res.status(500).send({
            message: "Server error" || err.err.message
        });
    }
};


const loginUser = (req, res) => {
    const { email, password } = req.body
    // basic validation
    if(!email || password){
        return res.status(400).send({
            message: "Email and Password are required"
        });
    } 
    if (!email.includes("@")) {
        return res.status(400).send({
            message: "Invalid email format"
        });
    } 
    return User.findOne({email}).then((user) => {
        if (!user) {
            return res.status(400).send({
                message: "Invalid email or password!"
            });
        }
        const isPasswordCorrect = bycrpt.compareSync(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).send({
                message: "Invalid email or password!"
            });
        }
        const token = auth.createAccessToken(user);
        return res.status(200).send({
            access: token,
            user: {
                email: user.email,
                role: user.role
            }
        });
    })
    .catch((err) => errorHandler(err, req, res));
};


    module.exports = {setAsAdmin, loginUser}