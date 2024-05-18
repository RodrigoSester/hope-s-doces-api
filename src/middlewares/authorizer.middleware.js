const jwt = require('jsonwebtoken');

const { logger } = require('../utils');
const { userExistsByEmail } = require('../helpers/verify-existence.helper');

const verify = async(req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Missing authorization header');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new Error('Missing token');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userExistsByEmail(decodedToken.email);

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
