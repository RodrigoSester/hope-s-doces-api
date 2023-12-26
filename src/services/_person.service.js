const knex = require("knex");


const db = require('../../database/config')

const register = async (person) => {
  return await db
    .insert({
      name: person.name,
      number: person.number
    })
    .into('person')
    .returning(['id', 'name', 'number', 'created_at']);
};

module.exports = {
  register
}