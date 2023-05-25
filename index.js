const express = require('express');
const auth = require('./auth/auth.router');
const users = require('./users/users.router');

require('dotenv').config();

require('./db/connect')();

function init() {
  const app = express();

  app.use(express.json());
  app.use('/api/v1/users', users);
  app.use('/api/v1/auth', auth);

  app.listen(3000, () => console.log('Ready to listen on port 3000'));
}

init();
