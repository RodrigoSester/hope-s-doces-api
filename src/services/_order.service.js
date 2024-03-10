const db = require('../../database/config');

const register = async(orderDTO) => {
  return await db
    .raw(`
      INSERT INTO 
        "order" (person_id, description, value, is_paid, adress, created_by, created_at, updated_by, updated_at)
      VALUES 
        (?, ?, ?, ?, ?, ?, NOW(), ?, NOW())
      RETURNING 
        id, person_id, description, value, is_paid, adress, created_by, created_at;
    `, [orderDTO.personId, orderDTO.description, orderDTO.value, orderDTO.isPaid, orderDTO.adress, orderDTO.createdBy, orderDTO.createdBy]);
};

const getAll = async(limit, offset, sortBy, order) => {
  return await db
    .select('id', 'person_id', 'description', 'value', 'is_paid', 'adress', 'created_at', 'created_by')
    .from('order')
    .limit(limit)
    .offset(offset);
};

const getById = async(id) => {
  return await db
    .select('id', 'person_id', 'description', 'value', 'is_paid', 'adress', 'created_at', 'created_by')
    .from('order')
    .where({ id })
    .first();
};

module.exports = {
  register,
  getAll,
  getById
};
