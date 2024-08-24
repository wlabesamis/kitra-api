const treasureModel = require('../models/treasure');

/**
 * Finds treasures within a specified distance from a given latitude and longitude.
 *
 * This function calls the `findTreasuresWithinDistance` method from the `treasureModel` to retrieve
 * treasures located within the specified distance from the provided coordinates.
 *
 * @async
 * @function
 * @param {number} lat - The latitude of the search center.
 * @param {number} lng - The longitude of the search center.
 * @param {number} distance - The distance (in kilometers) within which to search for treasures.
 * @returns {Promise<Array>} A promise that resolves to an array of treasures located within the specified distance.
 * @throws {Error} Throws an error if there is an issue with the database interaction.
 */
const findTreasuresWithinDistance = async (lat, lng, distance) => {
  return await treasureModel.findTreasuresWithinDistance(lat, lng, distance);
};

/**
 * Finds treasures within a specified distance and with a specific prize value from a given latitude and longitude.
 *
 * This function calls the `findTreasuresWithPrizeValue` method from the `treasureModel` to retrieve
 * treasures located within the specified distance from the provided coordinates and with the specified prize value.
 *
 * @async
 * @function
 * @param {number} lat - The latitude of the search center.
 * @param {number} lng - The longitude of the search center.
 * @param {number} distance - The distance (in kilometers) within which to search for treasures.
 * @param {number} prizeValue - The prize value of the treasures to be searched for.
 * @returns {Promise<Array>} A promise that resolves to an array of treasures located within the specified distance and prize value.
 * @throws {Error} Throws an error if there is an issue with the database interaction.
 */
const findTreasuresByPrizeValue = async (lat, lng, distance, prizeValue) => {
  return await treasureModel.findTreasuresWithPrizeValue(lat, lng, distance, prizeValue);
};

module.exports = { findTreasuresWithinDistance, findTreasuresByPrizeValue };