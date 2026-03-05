const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middlewares/authMiddleware');
const {errorHandler} = require('../middlewares/adminMiddleware')


// Register a User
const registerUser = (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    // Email validation
    if (!req.body.email.includes("@")) {
        return res.status(400).send({
            message: "Invalid email format"
        });
    }
    // Password validation
    if (req.body.password.length < 8) {
        return res.status(400).send({
            message: "Password must contain atleast 8 characters"
        });
    } else {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10)
        })
        console.log(newUser);
        return newUser.save().then(() => res.status(201).send({
            message: "Registered Successfully!"
        }))
        .catch(err => errorHandler(err, req, res));
    }
}
// Login a user
const loginUser = (req, res) => {
    const { email, password } = req.body
    // basic validation
    if(!email || !password){
        return res.status(400).send({
            message: "Email and Password are required"
        });
    } 
    if (!email.includes("@")) {
        return res.status(401).send({
            message: "Invalid email format"
        });
    } 
    return User.findOne({email}).then((user) => {
        if (!user) {
            return res.status(400).send({
                message: "Invalid email or password!"
            });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
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

const getProfile = (req, res) => {
    if (!req.user || req.user.id) {
        return res.status(401).send({
            message: "Unauthorized access"
        })
    }
    return User.findById(req.user.id).select("-password").then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found!"
            })
        }
        return res.status(200).send({
            message: "Successfully retrieved profile!",
            user: user
        });
    })
    .catch(err => errorHandler(err, req, res));
};


module.exports = {loginUser, registerUser, getProfile}