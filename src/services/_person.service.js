const db = require('../../database/config');

const register = async(person) => {
  return await db
    .raw(`
      INSERT INTO person (name, number, created_by, created_at)
      VALUES (?, ?, ?, NOW())
      RETURNING id, name, number, created_by, created_at;
    `, [person.name, person.number, person.createdBy]);
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
  return await db.raw(`
    UPDATE person 
    SET 
      is_deleted = true, 
      deleted_at = NOW(), 
      deleted_by = ? 
    WHERE id = ?
  `, [personDTO.userId, personDTO.id]);
};

module.exports = {
  register,
  getById,
  getAll,
  remove
};
