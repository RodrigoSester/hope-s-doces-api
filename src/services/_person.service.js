const db = require("../../database/config");

const register = async (person) => {
  return await db
    .raw(
      `
      INSERT INTO person (name, number, email, address, created_by, created_at, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), ?, NOW())
      RETURNING id, name, number, created_by, created_at;
    `,
      [
        person.name,
        person.number,
        person.email,
        person.address,
        person.createdBy,
        person.createdBy,
      ]
    )
    .then((response) => response.rows[0]);
};

const getById = async (id) => {
  return await db
    .select([
      "id",
      "name",
      "number",
      "created_by",
      "created_at",
      "updated_by",
      "updated_at",
    ])
    .from("person")
    .where("id", id)
    .andWhereNot("is_deleted", true)
    .first();
};

const getAll = async (filter) => {
  return await db
    .select([
      "id",
      "name",
      "number",
      "created_by",
      "created_at",
      "updated_by",
      "updated_at",
    ])
    .from("person")
    .whereNot("is_deleted", true)
    .offset(filter.offset)
    .limit(filter.limit)
    .orderBy(filter.sortBy, filter.order);
};

const remove = async (personDTO) => {
  return await db.raw(
    `
    UPDATE person 
    SET 
      is_deleted = true, 
      deleted_at = NOW(), 
      deleted_by = ? 
    WHERE id = ?
  `,
    [personDTO.userId, personDTO.id]
  );
};

const getOrdersByPersonId = async (personId, filter) => {
  return await db
    .select([
      "o.id",
      "o.description",
      "o.value",
      "o.is_paid",
      "o.adress",
      "p.name",
      "p.number",
      "o.created_by",
      "o.created_at",
      "o.updated_by",
      "o.updated_at",
    ])
    .from("order as o")
    .join("person as p", "o.person_id", "p.id")
    .where("person_id", personId)
    .andWhereNot("o.is_deleted", true)
    .offset(filter.offset)
    .limit(filter.limit)
    .orderBy(filter.sortBy, filter.order);
};

module.exports = {
  register,
  getById,
  getAll,
  remove,
  getOrdersByPersonId,
};
