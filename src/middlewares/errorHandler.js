/**
 * Custom error-handling middleware for Express applications.
 * 
 * This middleware catches errors thrown by other middleware or routes,
 * logs the error stack to the console, and sends an appropriate JSON response
 * based on the error type. It handles `UnauthorizedError`, `ForbiddenError`,
 * and generic server errors.
 * 
 * @param {Error} err - The error object, which contains information about the error.
 * @param {Object} req - The Express request object, which triggered the error.
 * @param {Object} res - The Express response object, used to send back the error response.
 * 
 * @returns {void} Sends a JSON response with an appropriate status code and error message.
 */
module.exports = (err, req, res) => {
    console.error(err.stack);

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'No valid token provided. Authentication required.'
        });
    }
    
    if (err.name === 'ForbiddenError') {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Invalid token or insufficient permissions.'
        });
    }
        
    res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred. Please try again later."
    });
};