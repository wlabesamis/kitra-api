module.exports = (err, req, res, next) => {
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