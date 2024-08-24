const request = require('supertest');
const app = require('../app');
require('dotenv').config();

const user = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;
let token = process.env.EXPIRED_TOKEN;

/**
 * @module treasuresTests
 * @description Test suite for the `/api/treasures` and `/api/v2/treasures` endpoints.
 */

/**
 * @function
 * @name testTreasuresWithoutAuth
 * @description Test suite for the `/api/treasures` endpoints without authorization.
 */
describe('GET /api/treasures', () => {

   /**
   * @test
   * @description Ensures that the endpoint returns treasures within a 1km radius.
   * Sends a GET request with latitude, longitude, and distance query parameters.
   * Expects a 200 status code and an array of treasures in the response.
   */
  it('should return treasures within 1km', async () => {
    const res = await request(app).get('/api/treasures').query({
      latitude: 14.552036595352455,
      longitude: 121.01696118771324,
      distance: 1
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  /**
   * @test
   * @description Ensures that the endpoint returns treasures with a prize value of $15 within a 10km radius.
   * Sends a GET request with latitude, longitude, distance, and prizeValue query parameters.
   * Expects a 200 status code and an array of treasures where each treasure has a prize value of 15.
   */
  it('should return treasures with prize value is equal $15 within 10km', async () => {
    const res = await request(app).get('/api/treasures').query({
      latitude: 14.552036595352455,
      longitude: 121.01696118771324,
      distance: 10,
      prizeValue: 15
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.every(treasure => treasure.prizeValue === 15)).toBeTruthy();
  });
})

/**
 * @function
 * @name testTreasuresWithAuth
 * @description Test suite for the `/api/v2/treasures` endpoints with authorization.
 */
describe('GET /api/v2/treasures', () => {

  /**
   * @test
   * @description Ensures that the endpoint returns a 403 status code for an invalid token.
   * Sends a GET request with an expired token and query parameters.
   * Expects a 403 status code and 'Forbidden' error message in the response.
   */
  it('should return invalid token', async () => {
    const res = await request(app)
                    .get('/api/v2/treasures')
                    .set({ Authorization: `Bearer ${token}` })
                    .query({
                      latitude: 14.552036595352455,
                      longitude: 121.01696118771324,
                      distance: 1
                    });
    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toEqual('Forbidden')
  });

  /**
   * @test
   * @description Ensures that the endpoint returns a 401 status code for unauthorized requests.
   * Sends a GET request without an authorization token and query parameters.
   * Expects a 401 status code and 'Unauthorized' error message in the response.
   */
  it('should return unauthorized request', async () => {
    const res = await request(app)
                    .get('/api/v2/treasures')
                    .query({
                      latitude: 14.552036595352455,
                      longitude: 121.01696118771324,
                      distance: 1
                    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual('Unauthorized')
  });

  /**
   * @test
   * @description Obtains a valid token by logging in.
   * Sends a POST request to the `/api/auth/login` endpoint with user credentials.
   * Expects a 200 status code and a token in the response.
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
    token = res.body.token
  });

  /**
   * @test
   * @description Ensures that the endpoint returns treasures within a 1km radius using a valid token.
   * Sends a GET request with a valid token and query parameters.
   * Expects a 200 status code and an array of treasures in the response.
   */
  it('should return treasures within 1km using valid token', async () => {
    const tresResponse = await request(app)
                    .get('/api/v2/treasures')
                    .set({ Authorization: `Bearer ${token}` })
                    .query({
                      latitude: 14.552036595352455,
                      longitude: 121.01696118771324,
                      distance: 1
                    });

    expect(tresResponse.statusCode).toEqual(200);
    expect(tresResponse.body.data).toBeInstanceOf(Array);
  });

  /**
   * @test
   * @description Ensures that the endpoint returns treasures with a prize value of $15 within a 10km radius using a valid token.
   * Sends a GET request with a valid token and query parameters.
   * Expects a 200 status code and an array of treasures where each treasure has a prize value of 15.
   */
  it('should return treasures with prize value is equal $15 within 10km using valid token', async () => {
    const tresResponse2 = await request(app)
                      .get('/api/v2/treasures')
                      .set({ Authorization: `Bearer ${token}` })
                      .query({
                        latitude: 14.552036595352455,
                        longitude: 121.01696118771324,
                        distance: 10,
                        prizeValue: 15
                      });

    expect(tresResponse2.statusCode).toEqual(200);
    expect(tresResponse2.body.data).toBeInstanceOf(Array);
    expect(tresResponse2.body.data.every(treasure => treasure.prizeValue === 15)).toBeTruthy();
  });


})