const express = require('express');
const auth = require('../middlewares/auth');
const validatePayload = require('../middlewares/validatePayload');
const { signUp, me } = require('./users.controller');
const router = express.Router();

router.post('', validatePayload, signUp);
router.get('/me', auth, me);

module.exports = router;
