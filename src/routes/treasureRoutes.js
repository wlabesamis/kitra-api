const express = require('express');
const { getTreasures } = require('../controllers/treasureController');
const { validateTreasureQuery } = require('../middlewares/validationMiddleware')
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Treasure:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The treasure ID
 *         Name:
 *           type: string
 *           description: The name of the treasure
 *         latitude:
 *           type: number
 *           description: The latitude of the treasure location
 *         longitude:
 *           type: number
 *           description: The longitude of the treasure location
 *         prizeValue:
 *           type: integer
 *           description: The  prize value of the treasure
 */

/**
 * @swagger
 * /treasures:
 *   get:
 *     summary: Find treasures within a specified distance and or by prize value
 *     tags: [Treasure]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           default: 14.552036595352455
 *         required: true
 *         description: Latitude of the search center
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           default: 121.01696118771324
 *         required: true
 *         description: Longitude of the search center
 *       - in: query
 *         name: distance
 *         schema:
 *           type: integer
 *           enum: [1, 10]
 *         required: true
 *         description: Distance in kilometers (1 or 10)
 *       - in: query
 *         name: prizeValue
 *         schema:
 *           type: integer
 *         description: Prize value of the treasure (optional)
 *     responses:
 *       200:
 *         description: A list of treasures with a prize value
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treasure'
 */

/**
 * @swagger
 * /v2/treasures:
 *   get:
 *     summary: Find treasures within a specified distance and or by prize value with Authorization
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           default: 14.552036595352455
 *         required: true
 *         description: Latitude of the search center
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           default: 121.01696118771324
 *         required: true
 *         description: Longitude of the search center
 *       - in: query
 *         name: distance
 *         schema:
 *           type: integer
 *           enum: [1, 10]
 *         required: true
 *         description: Distance in kilometers (1 or 10)
 *       - in: query
 *         name: prizeValue
 *         schema:
 *           type: integer
 *         description: Prize value of the treasure (optional)
 *     responses:
 *       200:
 *         description: A list of treasures with a prize value
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treasure'
 */

router.get('/treasures', validateTreasureQuery, getTreasures);

router.get('/v2/treasures', authenticateToken, validateTreasureQuery, getTreasures); //this route settings has an authentication

module.exports = router; 