/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('person', table => {
    table.foreign('created_by').references('id').inTable('user');
    table.foreign('updated_by').references('id').inTable('user');
    table.foreign('deleted_by').references('id').inTable('user');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('person', table => {
    table.dropForeign('created_by');
    table.dropForeign('updated_by');
    table.dropForeign('deleted_by');
  });
};
