const bcrypt = require('bcrypt');

const { userService } = require('../services');

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { id, email, username } = req.body;

    const token = jwt.sign({ id, email, username }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
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
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register
};
