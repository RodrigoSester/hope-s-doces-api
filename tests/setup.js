const request = require('supertest');

const app = require('../src/index');
const db = require('../database/config');

async function _runMigrations() {
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
