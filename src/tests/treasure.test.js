const request = require('supertest');
const app = require('../app');
require('dotenv').config();

const user = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;
let token = process.env.EXPIRED_TOKEN;


describe('GET /api/treasures', () => {
  it('should return treasures within 1km', async () => {
    const res = await request(app).get('/api/treasures').query({
      latitude: 14.552036595352455,
      longitude: 121.01696118771324,
      distance: 1
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should return treasures with prize value >= $10 within 10km', async () => {
    const res = await request(app).get('/api/treasures').query({
      latitude: 14.552036595352455,
      longitude: 121.01696118771324,
      distance: 10,
      prize_value: 10
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.every(treasure => treasure.prize_value >= 10)).toBeTruthy();
  });
})

describe('GET /api/v2/treasures', () => {
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


})