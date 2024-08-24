const express = require('express');
const { userLogin } = require('../controllers/authController');
const { validateUserLogin } = require('../middlewares/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "u1@kitra.abc"
 *               password:
 *                 type: string
 *                 example: "123123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

/**
 * Route to handle user login requests.
 * 
 * This route:
 * - Validates the login request body using `validateUserLogin` middleware.
 * - Passes the validated request to the `userLogin` controller to authenticate the user.
 * - Responds with a JWT token on successful login or an error message if authentication fails.
 * 
 * @function
 * @name postLogin
 * @memberof module:routes/auth
 * @param {string} path - The route path `/auth/login`.
 * @param {Array<Function>} [middlewares] - Array of middleware functions, including `validateUserLogin`.
 * @param {Function} handler - The controller function `userLogin` to handle the login logic.
 */
router.post('/auth/login', validateUserLogin, userLogin);

module.exports = router;