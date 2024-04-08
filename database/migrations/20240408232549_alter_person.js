/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('person', table => {
    table.string('email', 100).unique().notNullable();
    table.string('number').alter().unique();
    table.text('address');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('person', table => {
    table.dropColumn('email');
    table.string('number').alter().dropUnique();
    table.dropColumn('address');
  });
};
