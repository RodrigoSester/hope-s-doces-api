const request = require('supertest');
const app = require('../../index');

const knex = require('knex');
const knexfile = require('../../knexfile');

let server;
let token;
let db;

beforeAll(async() => {
  server = app.listen(3001);

  db = knex(knexfile.test);
  await db.migrate.latest();

  const user = { username: 'testuser', email: 'teste@gmail.com', password: 'testpassword' };
  const { body } = await request(app).post('/users').send(user);

  const res = await request(app).post('/users/login').send(body);
  token = res.body.token;
});

afterAll(() => {
  db.migrate.rollback();
  db.destroy();
  server.close();
});

describe('registerPerson', () => {
  it('should return 400 if the body is missing required fields', async() => {
    const response = await request(app)
      .post('/person')
      .send({})
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Missing required fields' });
  });
});
