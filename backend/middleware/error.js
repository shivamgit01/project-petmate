const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Service Not Available";

    if (err.name === "CastError") {
        const message = `Page Not Found. Error: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};