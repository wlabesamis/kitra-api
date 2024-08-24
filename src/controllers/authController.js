const userAuthService = require('../services/authService');
const jwt = require('jsonwebtoken');

/**
 * Handles user login by validating the provided email and password.
 * If the credentials are valid, a JWT token is generated and returned.
 * 
 * @param {Object} req - The Express request object, containing the email and password in the body.
 * @param {Object} res - The Express response object, used to send back the appropriate response.
 * @param {Function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves to void, but sends a JSON response to the client.
 * 
 * @throws Will pass any caught errors to the next middleware function.
 */
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate the user's credentials
        const user = await userAuthService.validateUser(email, password);
      
        // If no user is found, return a 401 Unauthorized response
        if (user.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
    
        }

        // Generate a JWT token with the user's ID and email, expiring in 1 hour
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token in the response
        return res.json({
            status: 'success',
            message: 'Login successful',
            token,
        });

    } catch (error) {
        // Pass any errors to the next middleware for handling
        next(error);
    }
};

module.exports = { userLogin };