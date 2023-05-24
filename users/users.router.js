const express = require('express');
const validatePayload = require('../middlewares/validatePayload');
const { signUp } = require('./users.controller');
const router = express.Router();

router.post('', validatePayload, signUp);

module.exports = router;
