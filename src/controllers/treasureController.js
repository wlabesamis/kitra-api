const treasureService = require('../services/treasureService');

/**
 * Retrieves treasures based on the provided query parameters.
 * If a prize value is specified, it retrieves treasures matching that prize value.
 * Otherwise, it retrieves treasures within a specified distance from the given coordinates.
 *
 * @param {Object} req - The Express request object, containing query parameters: latitude, longitude, distance, and optionally prizeValue.
 * @param {Object} res - The Express response object, used to send back the appropriate response.
 * @param {Function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves to void, but sends a JSON response to the client.
 */
const getTreasures = async (req, res, next) => {
    try {
        const { latitude, longitude, distance, prizeValue } = req.query;

        const treasures = prizeValue
            ? await treasureService.findTreasuresByPrizeValue(latitude, longitude, distance, prizeValue)
            : await treasureService.findTreasuresWithinDistance(latitude, longitude, distance);

        const message = treasures.length === 0 ? 'No results found' : 'Results found';

        res.json({
            status: 'success',
            message: message,
            data: treasures
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getTreasures };