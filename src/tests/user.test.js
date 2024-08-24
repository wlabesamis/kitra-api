const request = require('supertest');
const app = require('../app');
require('dotenv').config();

let token = process.env.EXPIRED_TOKEN;
const user = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;

describe('GET /api/auth/login', () => {
  it('should return token', async () => {
    const res = await request(app)
                  .post('/api/auth/login')
                  .send({
                    email:user,
                    password:password
                  })

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success')
    expect(res.body).toHaveProperty('token');
  });

  it('should return invalid email or password', async () => {
    const res = await request(app)
                  .post('/api/auth/login')
                  .send({
                    email:'test@test.com',
                    password:'test123'
                  })
                  
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual('error')
    expect(res.body.message).toEqual('Invalid email or password')
  });

  it('should return error', async () => {
    const res = await request(app)
                  .post('/api/auth/login')
                  .send({
                    email:'test',
                    password:'test'
                  })

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    const errors = res.body.errors;

    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(2);

    expect(errors[0]).toHaveProperty('msg', 'Invalid email format');
    expect(errors[0]).toHaveProperty('path', 'email');

    expect(errors[1]).toHaveProperty('msg', 'Password must be at least 6 characters long');
    expect(errors[1]).toHaveProperty('path', 'password');
   
  });
})