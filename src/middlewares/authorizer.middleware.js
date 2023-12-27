const jwt = require('jsonwebtoken');

const _getUserFromDatabase = async (token) => {
  // TODO: get user from database
  return;
};

const verify = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Missing authorization header');
    }
    const token = authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await _getUserFromDatabase(decodedToken);
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  verify,
};