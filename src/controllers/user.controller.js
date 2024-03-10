const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { logger } = require('../utils');
const { userService } = require('../services');
const { verifyPassword, userExistsByEmail } = require('../helpers/verify-existence.helper');

const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userExistsByEmail(email);
    const hashedPassword = user.password;
  
    await verifyPassword(password, hashedPassword);
    
    const token = jwt.sign({ id: user.id, email, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: error.message });
  }
};

const register = async(req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDTO = {
      username,
      email,
      hashedPassword
    };
    const registeredUser = await userService.register(userDTO);

    return res.status(201).json(registeredUser[0]);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register
};
