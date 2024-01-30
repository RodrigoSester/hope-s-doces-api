const db = require('../../database/config');

const register = async(orderDTO) => {
  return await db
    .insert({
      personId: orderDTO.person_id,
      description: orderDTO.description,
      value: orderDTO.value,
      isPaid: orderDTO.is_paid,
      adress: orderDTO.adress,
      createdBy: orderDTO.createdBy,
      updatedBy: orderDTO.createdBy
    })
    .into('order')
    .returning(['id', 'person_id', 'description', 'value', 'is_paid', 'adress', 'created_at', 'created_by']);
};

const getAll = async(limit, offset, sortBy, order) => {
  return await db
    .select('id', 'person_id', 'description', 'value', 'is_paid', 'adress', 'created_at', 'created_by')
    .from('order')
    .limit(limit)
    .offset(offset);
};

module.exports = {
  register,
  getAll
};
