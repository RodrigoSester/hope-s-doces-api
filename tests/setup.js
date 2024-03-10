const request = require('supertest');
const knex = require('knex');

const app = require('../src/index');
const knexfile = require('../knexfile');

let db;

async function _runMigrations() {
  db = knex(knexfile.test);
  await db.migrate.latest();
}

async function _authorizeUser() {
  const user = { username: 'testuser', email: 'teste@gmail.com', password: 'testpassword' };
  const { body } = await request(app).post('/users').send(user);

  global.token = body.token;
}

const init = async() => {
  await _runMigrations();

  await _authorizeUser();
};

module.exports = init;
