const User = require('../users/users.model');

const _ = require('underscore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async signUp(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email }).exec();

      if (user)
        return res
          .status(400)
          .send({ ok: false, msg: 'User already registered' });

      user = new User(req.body);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      user.save();

      const token = jwt.sign(
        _.pick(user, ['firstName', '_id']),
        process.env.PRIVATE_KEY
      );

      res.status(201).send({ ok: true, token });
    } catch (err) {
      res.status(500).send({ ok: false, msg: 'Please try again later' });
    }
  },
};
