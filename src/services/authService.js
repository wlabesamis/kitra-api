const users = require('../models/users');

const validateUser = async (email, password) => {
  return await users.login(email, password);
};

module.exports = { validateUser };
