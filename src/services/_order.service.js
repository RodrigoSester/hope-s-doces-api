
const db = require('../../database/config');


const register = async (orderDTO) => {
  return await db
    .insert({
      person_id: orderDTO.person_id,
      description: orderDTO.description,
      value: orderDTO.value,
      is_paid: orderDTO.is_paid,
      adress: orderDTO.adress,
      created_by: orderDTO.created_by,
      updated_by: orderDTO.created_by
    })
    .into('order')
    .returning(['id', 'person_id', 'description', 'value', 'is_paid', 'adress', 'created_at', 'created_by']);
};

module.exports = {
  register
}