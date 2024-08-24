const request = require('supertest');
const app = require('../app');
require('dotenv').config();

let token = process.env.EXPIRED_TOKEN;
const user = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;

/**
 * @module authTests
 * @description Test suite for the authentication endpoints.
 */

/**
 * @function
 * @name testLogin
 * @description Tests for the `/api/auth/login` endpoint.
 */
describe('GET /api/auth/login', () => {

  /**
   * @test
   * @description Tests successful login with valid credentials.
   * Sends a POST request to `/api/auth/login` with valid email and password.
   * Expects a 200 status code, a 'success' status, and a token in the response.
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
   * @test
   * @description Tests login with invalid email or password.
   * Sends a POST request to `/api/auth/login` with incorrect email and password.
   * Expects a 401 status code, an 'error' status, and a specific error message.
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
   * @test
   * @description Tests login with invalid input formats.
   * Sends a POST request to `/api/auth/login` with an invalid email and password.
   * Expects a 400 status code and an array of validation errors in the response.
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