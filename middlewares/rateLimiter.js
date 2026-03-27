const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP
  message: {
    message: "Too many requests from this IP, please try again later."
  }
});

module.exports = rateLimiter;