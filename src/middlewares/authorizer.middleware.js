const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { logger } = require('../utils');
const { userService } = require('../services');

const verify = async(req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Missing authorization header');
    }

    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = userService.getUserByEmail(decodedToken.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(user.password, decodedToken.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  verify
};
