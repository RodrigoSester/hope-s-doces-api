const db = require('../../database/config')

const register = async (person) => {
  return await db
    .insert({
      name: person.name,
      number: person.number,
      created_by: person.created_by,
      updated_by: person.created_by
    })
    .into('person')
    .returning(['id', 'name', 'number', 'created_by', 'created_at']);
};

module.exports = {
  register
}