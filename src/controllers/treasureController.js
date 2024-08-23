const treasureService = require('../services/treasureService');

const getTreasures = async (req, res, next) => {
    try {
        const { latitude, longitude, distance, prizeValue } = req.query;

        let treasures;

        if (prizeValue) {
            treasures = await treasureService.findTreasuresByPrizeValue(latitude, longitude, distance, prizeValue);
        } else {
            treasures = await treasureService.findTreasuresWithinDistance(latitude, longitude, distance);
        }

        if (treasures.length === 0) {
            return res.json({
                status: 'success',
                message: 'No results found',
                data: []
            });
        }
      
        res.json({
            status: 'success',
            message: 'Results found',
            data: treasures
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getTreasures };