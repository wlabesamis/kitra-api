const jwt = require('jsonwebtoken');

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