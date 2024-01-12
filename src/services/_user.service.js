

const db = require('../../database/config')

const register = async (person) => {
  return await db
    .insert({
      username: person.username,
      email: person.email,
      password: person.hashedPassword
    })
    .into('user')
    .returning(['id', 'username', 'email'])
};

module.exports = {
  register
};