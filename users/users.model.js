const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
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
  })
);
