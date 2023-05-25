const User = require('../users/users.model');

const _ = require('underscore');
const bcrypt = require('bcrypt');

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

      const token = user.generateAuthToken();

      res
        .header('x-auth-token', token)
        .status(201)
        .send({ ok: true, data: _.pick(user, '_id', 'firstName') });
    } catch (err) {
      res.status(500).send({ ok: false, msg: 'Please try again later' });
    }
  },

  async me(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });

      res.send({ ok: true, data: _.pick(user, '_id', 'firstName') });
    } catch (err) {
      res.status(500).send({ ok: false, msg: 'Please try again later' });
    }
  },
};
