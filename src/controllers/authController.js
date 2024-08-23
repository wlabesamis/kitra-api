const userAuthService = require('../services/authService');
const jwt = require('jsonwebtoken');


const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userAuthService.validateUser(email, password );
      
        if (user.length === 0) {
            return  res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
    
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            status: 'success',
            message: 'Login successful',
            token: token
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { userLogin };