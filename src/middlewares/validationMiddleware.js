const { check, validationResult } = require('express-validator');

/**
 * Middleware to validate query parameters for treasure-related requests.
 * 
 * This validation checks:
 * - `latitude`: Must be a float between -90 and 90.
 * - `longitude`: Must be a float between -180 and 180.
 * - `distance`: Must be either 1 or 10.
 * - `prizeValue`: Optional; if provided, must be an integer between 10 and 30.
 * 
 * If validation fails, a 400 Bad Request response with validation errors is sent.
 * 
 * @type {Array<Function>}
 */
const validateTreasureQuery = [
  check('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  check('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  check('distance').isIn([1, 10]).withMessage('Distance must be 1 or 10'),
  check('prizeValue').optional().isInt({ min: 10, max: 30 }).withMessage('Prize value must be between 10 and 30'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Middleware to validate user login request body.
 * 
 * This validation checks:
 * - `email`: Must be a valid email format.
 * - `password`: Must be at least 6 characters long.
 * 
 * If validation fails, a 400 Bad Request response with validation errors is sent.
 * 
 * @type {Array<Function>}
 */
const validateUserLogin = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateTreasureQuery, validateUserLogin };