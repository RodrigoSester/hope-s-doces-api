const request = require('supertest');
const app = require('../../index');

const knex = require('knex');
const knexfile = require('../../knexfile');

let server;
let token;
let db;

async function _runMigrations() {
  db = knex(knexfile.test);
  await db.migrate.latest();
}

function rollbackMigrations() {
  db.migrate.rollback();
  db.destroy();
}

async function _authorizeUser() {
  const user = { username: 'testuser', email: 'teste@gmail.com', password: 'testpassword' };
  const { body } = await request(app).post('/users').send(user);

  const res = await request(app).post('/users/login').send(body);

  return res.body.token;
}

const beforeTests = async() => {
  server = app.listen(3001);

  await _runMigrations();

  token = await _authorizeUser();

  return token;
};

const afterTests = () => {
  rollbackMigrations();
  server.close();
};

module.exports = {
  beforeTests,
  afterTests
};
