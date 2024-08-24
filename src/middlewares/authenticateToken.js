const jwt = require('jsonwebtoken');

/**
 * Middleware function to authenticate JWT tokens.
 * 
 * This middleware checks the `Authorization` header for a JWT token,
 * verifies the token using the secret key, and attaches the user information
 * to the request object if the token is valid. If no token is provided or
 * the token is invalid, it passes an error to the next middleware.
 * 
 * @param {Object} req - The Express request object, which may contain the `Authorization` header.
 * @param {Object} res - The Express response object, used to send back responses (not used in this middleware).
 * @param {Function} next - The next middleware function in the Express pipeline.
 * 
 * @throws {UnauthorizedError} If no token is provided in the `Authorization` header.
 * @throws {ForbiddenError} If the token is invalid or cannot be verified.
 * 
 * @returns {void} Calls the next middleware function or sends an error response.
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        const error = new Error('No token provided. Authentication required.');
        error.name = 'UnauthorizedError';
        return next(error);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            const error = new Error('Invalid token. Access denied.');
            error.name = 'ForbiddenError';
            return next(error);
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;