const { check, validationResult } = require('express-validator');

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
]

module.exports = { validateTreasureQuery, validateUserLogin};