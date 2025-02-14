const db = require('../../database/config');

const register = async(person) => {
  return await db
    .insert({
      name: person.name,
      number: person.number,
      createdBy: person.createdBy,
      updatedBy: person.createdBy
    })
    .into('person')
    .returning(['id', 'name', 'number', 'created_by', 'created_at']);
};

const getById = async(id) => {
  return await db
    .select(['id', 'name', 'number', 'created_by', 'created_at', 'updated_by', 'updated_at'])
    .from('person')
    .where('id', id)
    .andWhereNot('is_deleted', true)
    .first();
};

const getAll = async(filter) => {
  return await db
    .select(['id', 'name', 'number', 'created_by', 'created_at', 'updated_by', 'updated_at'])
    .from('person')
    .whereNot('is_deleted', true)
    .offset(filter.offset)
    .limit(filter.limit)
    .orderBy(filter.sortBy, filter.order);
};

const remove = async(personDTO) => {
  return await db
    .raw(`
      UPDATE person
      SET
        is_deleted = $1,
        deleted_at = NOW(),
        deleted_by = $2
      WHERE 
        id = $3
    `, [true, personDTO.userId, personDTO.id]);
};

module.exports = {
  register,
  getById,
  getAll,
  remove
};
