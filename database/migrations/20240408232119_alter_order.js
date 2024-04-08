/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('order', table => {
    table.dropColumn('is_delivered');
    table.dropColumn('is_paid');

    table.string('delivery_status', 25).defaultTo('pending');
    table.string('payment_status', 25).defaultTo('pending');

    table.timestamp('delivered_at').nullable();
    table.timestamp('paid_at').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('order', table => {
    table.boolean('is_delivered').defaultTo(false);
    table.boolean('is_paid').defaultTo(false);

    table.dropColumn('delivery_status');
    table.dropColumn('payment_status');

    table.dropColumn('delivered_at');
    table.dropColumn('paid_at');
  });
};
