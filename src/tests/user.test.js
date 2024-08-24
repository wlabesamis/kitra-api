const request = require('supertest');
const app = require('../app');
require('dotenv').config();

let token = process.env.EXPIRED_TOKEN;
const user = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;

/**
 * Test suite for the /api/auth/login endpoint.
 */
describe('GET /api/auth/login', () => {

   /**
   * Test case to ensure the endpoint returns a token for valid user credentials.
   * Sends a POST request with valid email and password.
   * Expects a 200 status code, 'success' status in the response, and a token.
   */
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

  /**
   * Test case to ensure the endpoint returns an error for invalid email or password.
   * Sends a POST request with incorrect email and password.
   * Expects a 401 status code, 'error' status in the response, and an appropriate error message.
   */
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

  /**
   * Test case to ensure the endpoint returns validation errors for malformed input.
   * Sends a POST request with invalid email and password format.
   * Expects a 400 status code and an array of validation errors.
   */
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