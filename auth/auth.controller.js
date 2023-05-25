const User = require('../users/users.model');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(400)
      .send({ ok: false, msg: 'Invalid email or password' });

  const isPassword = await bcrypt.compare(req.body.password, user.password);

  if (!isPassword)
    return res
      .status(400)
      .send({ ok: false, msg: 'Invalid email or password' });

  const token = user.generateAuthToken();

  res.send(token);
};
