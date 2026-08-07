const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no valid token provided.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role || 'EMPLOYEE'
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token invalid or expired.'
        });
    }
};