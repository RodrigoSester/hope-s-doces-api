const bcrypt = require('bcrypt');

const { userService } = require('../services');

const login = async (req, res) => {
  try {
    const token = generateToken();
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
    const registeredUser = userService.register(userDTO)

    return res.status(201).json(registeredUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  login,
  register
}