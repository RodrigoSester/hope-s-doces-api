const request = require('supertest');
const app = require('../../index');

const { beforeTests, afterTests } = require('../helpers/test.helper');

let token;

beforeAll(async() => {
  token = await beforeTests();
});

afterAll(() => {
  afterTests();
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

  it('should return 201 if the person is successfully registered', async() => {
    const response = await request(app)
      .post('/person')
      .send({
        name: 'John Doe',
        number: '123456789'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'John Doe');
    expect(response.body).toHaveProperty('number', '123456789');
  });
});
