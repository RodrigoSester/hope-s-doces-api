const login = async (req, res) => {
  try {
    const token = generateToken()
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async(req, res) => {
  // TODO: implement method
}

module.exports = {
  login
}