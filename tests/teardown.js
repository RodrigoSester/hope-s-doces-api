const knex = require('knex');
const knexfile = require('../knexfile');

const db = knex(knexfile.test);

const down = async() => {
  await db.migrate.rollback();
  await db.destroy();
};

module.exports = down;
