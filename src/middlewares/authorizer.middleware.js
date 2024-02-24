const jwt = require('jsonwebtoken');
const { logger } = require('../utils');

const verify = async(req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Missing authorization header');
    }

    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  verify
};
