const request = require('supertest');
const app = require('../../src/index');

const token = global.token;

describe('Person tests', () => {
  let person = {
    name: 'John Doe',
    number: '123456789'
  };

  describe('Register person', () => {
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

    it('should return 400 if the body is missing the name field', async() => {
      const response = await request(app)
        .post('/person')
        .send({ number: '123456789' })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Missing required fields' });
    });

    it('should return 400 if the body is missing the number field', async() => {
      const response = await request(app)
        .post('/person')
        .send({ name: 'John Doe' })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Missing required fields' });
    });

    it('should return 400 if the number field is not a string', async() => {
      const response = await request(app)
        .post('/person')
        .send({ name: 'John Doe', number: 123456789 })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid data type' });
    });

    it('should return 400 if the name field is not a string', async() => {
      const response = await request(app)
        .post('/person')
        .send({ name: 123456789, number: '123456789' })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid data type' });
    });
  
    it('should return 201 if the person is successfully registered', async() => {
      const response = await request(app)
        .post('/person')
        .send(person)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      person = response.body;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('number', '123456789');
    });
  });

  describe('Get person by id', () => {
    it('should return 404 if the person does not exist', async() => {
      const response = await request(app)
        .get('/person/10000')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'error', error: 'Person with id 10000 not found', code: 'internal_server_error' });
    });

    it('should return 200 if the person exists', async() => {
      const response = await request(app)
        .get(`/person/${person.id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('number', '123456789');
    });
  });
});
