const db = require('../../database/config');

const register = async(person) => {
  return await db
    .insert({
      username: person.username,
      email: person.email,
      password: person.hashedPassword
    })
    .into('user')
    .returning(['id', 'username', 'email']);
};

const getUserByEmail = async(email) => {
  return await db
    .select('id', 'username', 'email', 'password')
    .from('user')
    .where({ email })
    .first();
};

module.exports = {
  register,
  getUserByEmail
};
