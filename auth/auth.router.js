const signIn = require('./auth.controller');
const express = require('express');
const router = express.Router();

router.post('', signIn);

module.exports = router;
