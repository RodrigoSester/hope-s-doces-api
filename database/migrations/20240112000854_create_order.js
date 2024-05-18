/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order', table => {
    table.increments('id').primary();

    table.integer('person_id').notNullable();
    table.foreign('person_id').references('id').inTable('person');

    table.text('description').notNullable();
    table.decimal('value').notNullable();
    table.boolean('is_paid').notNullable().defaultTo(false);
    table.string('adress', 150).notNullable();

    table.integer('created_by').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.integer('updated_by').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order');
};
