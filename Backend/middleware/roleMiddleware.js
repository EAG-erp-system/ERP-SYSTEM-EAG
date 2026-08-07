
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. User role not defined.'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden. Role '${req.user.role}' is not authorized to access this resource.`
            });
        }

        next();
    };
};