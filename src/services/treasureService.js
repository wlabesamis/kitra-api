const treasureModel = require('../models/treasure');

const findTreasuresWithinDistance = async (lat, lng, distance) => {
  return await treasureModel.findTreasuresWithinDistance(lat, lng, distance);
};

const findTreasuresByPrizeValue = async (lat, lng, distance, prizeValue) => {
  return await treasureModel.findTreasuresWithPrizeValue(lat, lng, distance, prizeValue);
};

module.exports = { findTreasuresWithinDistance, findTreasuresByPrizeValue };
