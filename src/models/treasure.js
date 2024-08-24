const db = require('../config/database');


/**
 * Finds the nearest treasure within a specified distance from given coordinates.
 *
 * @param {number} lat - The latitude of the current location.
 * @param {number} lng - The longitude of the current location.
 * @param {number} distance - The maximum distance in kilometers to search for treasures.
 * @returns {Promise<Array>} A promise that resolves to an array containing the nearest treasure details.
 */

const findTreasuresWithinDistance = async (lat, lng, distance) => {
  const query = `
    SELECT t.id, t.name, t.latitude, t.longitude, MIN(mv.amt) as prizeValue
    FROM treasures t
    JOIN money_values mv ON t.id = mv.treasure_id
    WHERE ST_Distance_Sphere(point(t.longitude, t.latitude), point(?, ?)) <= ?
    GROUP BY t.id;
  `;
  const [results] = await db.query(query, [lng, lat, distance * 1000]);
  return results;
};


/**
 * Finds treasures within a specified distance and with a specific prize value from given coordinates.
 *
 * @param {number} lat - The latitude of the current location.
 * @param {number} lng - The longitude of the current location.
 * @param {number} distance - The maximum distance in kilometers to search for treasures.
 * @param {number} prizeValue - The exact prize value to filter treasures.
 * @returns {Promise<Array>} A promise that resolves to an array of treasures matching the criteria.
 */
const findTreasuresWithPrizeValue = async (lat, lng, distance, prizeValue) => {
  const query = `
    SELECT t.id, t.name, t.latitude, t.longitude, mv.amt as prizeValue
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