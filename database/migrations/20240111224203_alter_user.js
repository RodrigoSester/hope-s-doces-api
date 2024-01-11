/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('user', (table) => {
    table.string('password').notNullable();

    table.unique('email');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user', (table) => {
    table.dropColumn('password');

    table.dropUnique('email');
  });
};
