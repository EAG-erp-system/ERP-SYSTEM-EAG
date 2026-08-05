exports.notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

exports.errorHandler = (err, req, res, next) => {
    console.log("Server Error Log:", err);

    const statusCode = res.statusCode === 200 ? (err.statusCode || 500) : res.statusCode;

    let message = err.message || "Server Error";

    if(process.env.NODE_ENV === `production` && statusCode === 500) {
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === `production` ? null : err.stack,
    });
};