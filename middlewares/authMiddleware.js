const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


// Token Creation
// jwt.sign(payload, secret, options)

module.exports.createAccessToken = (user) => {
    const data = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, JWT_SECRET_KEY,{});
};
