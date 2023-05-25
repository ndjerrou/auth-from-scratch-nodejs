const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
    required: true,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY);
};

module.exports = mongoose.model('User', userSchema);
