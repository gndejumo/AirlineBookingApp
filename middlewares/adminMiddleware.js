const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const Blacklist = require('../models/Blacklist');
// Token Verification

const verify = (req, res, next) => {
    console.log(req.headers.authorization);

    // kunin ang authorazation header
    const authHeader = req.headers.authorization;

    // check kung may token
    if(!authHeader){
        return res.status(401).json({
            message: "No token provided"
        });
    }
    // check kung tamang format
    if(!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid token format"
        });
    }
    // remove word "Bearer "
    const token = authHeader.split(" ")[1];
    // check blacklist
    Blacklist.findOne({token}).then(blacklisted => {
        if (blacklisted) {
            return res.status(401).send({
                message: "User has been logged out"
            })
        }
    // verify token
    // syntax = jwt.verify(token, secretOrPublicKey, callback)
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            });
        }
    // attach decoded user sa request
    req.user = decoded;
    console.log("Result from verify method:")
    console.log(decoded)
    next();
    });
    })
    .catch(err => next(err))
}

// Admin verfication
const verifyAdmin = (req, res, next) => {
    if(req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            auth: "Failed",
            message: "Action Forbidden"
        });
    }
}
module.exports = {verify, verifyAdmin}