const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


// Token Creation
// jwt.sign(payload, secret, options)
const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(data, JWT_SECRET_KEY,{expiresIn: "24h"});
};

module.exports = {createAccessToken}
