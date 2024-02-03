const Knex = require('knex').Client;
const knexfile = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = new Knex(configOptions);
