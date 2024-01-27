/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('person', table => {
    table.increments('id', { primaryKey: true });

    table.string('name', 255).notNullable();
    table.string('number', 25).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('created_by').notNullable();
    table.integer('updated_by').notNullable();

    table.integer('deleted_by');

    table.timestamp('deleted_at');
    table.boolean('is_deleted').defaultTo(false);

    table.index('name', 'idx_person_name');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('person');
};
