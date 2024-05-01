const db = require('../../database/config');

const register = async(orderDTO) => {
  const values = [
    orderDTO.personId,
    orderDTO.description,
    orderDTO.value,
    orderDTO.isPaid,
    orderDTO.adress,
    orderDTO.createdBy,
    orderDTO.createdBy
  ];

  return await db
    .raw(`
      INSERT INTO 
        "order" (person_id, description, value, is_paid, adress, created_by, created_at, updated_by, updated_at)
      VALUES 
        (?, ?, ?, ?, ?, ?, NOW(), ?, NOW())
      RETURNING 
        id, person_id, description, value, is_paid, adress, created_by, created_at;
    `, values);
};

const getAll = async(filter) => {
  return await db
    .select('o.id', 'o.description', 'o.value', 'o.payment_status', 'o.paid_at', 'o.delivery_status', 'o.delivered_at', 'o.adress', 'o.created_at', 'o.created_by')
    .select('p.id AS __person_id', 'p.name AS __person_name', 'p.number AS __person_number')
    .fromRaw('"order" AS o')
    .join('person AS p', 'o.person_id', 'p.id')
    .limit(filter.limit)
    .offset(filter.offset)
    .orderByRaw(`o.${filter.sortBy} ${filter.order}`).then((orders) => {
      return orders.map((order) => {
        return {
          ...order,
          person: {
            id: order.__person_id,
            name: order.__person_name,
            number: order.__person_number
          }
        };
      });
    });
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
