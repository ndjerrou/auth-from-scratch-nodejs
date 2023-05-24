const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to ATLAS');
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = connect;
