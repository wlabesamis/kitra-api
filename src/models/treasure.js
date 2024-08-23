const db = require('../config/database');

const findTreasuresWithinDistance = async (lat, lng, distance) => {
  const query = `
    SELECT t.id, t.name, t.latitude, t.longitude, MIN(mv.amt) as prize_value
    FROM treasures t
    JOIN money_values mv ON t.id = mv.treasure_id
    WHERE ST_Distance_Sphere(point(t.longitude, t.latitude), point(?, ?)) <= ?
    GROUP BY t.id
    LIMIT 1;
  `;
  const [results] = await db.query(query, [lng, lat, distance * 1000]);
  return results;
};

const findTreasuresWithPrizeValue = async (lat, lng, distance, prizeValue) => {
  const query = `
    SELECT t.id, t.name, t.latitude, t.longitude, mv.amt
    FROM treasures t
    JOIN money_values mv ON t.id = mv.treasure_id
    WHERE ST_Distance_Sphere(point(t.longitude, t.latitude), point(?, ?)) <= ?
    AND mv.amt = ?
    GROUP BY t.id;
  `;

  const [results] = await db.query(query, [lng, lat, distance * 1000, prizeValue]);
  return results;
};

module.exports = { findTreasuresWithinDistance, findTreasuresWithPrizeValue };