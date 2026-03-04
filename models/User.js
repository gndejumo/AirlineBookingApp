const mongoose = require ('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: String, enum: ["user", "admin"], default: "user" }
});

module.exports = model('User', userSchema);
// model name: User
// collection : users