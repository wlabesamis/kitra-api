const request = require('supertest');
const app = require('../app');

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