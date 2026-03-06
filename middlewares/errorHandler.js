const errorHandler = (err, _req, res, _next) => {
    // Log the error
    console.error(err);

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal server error';
    
    // Send a standardized error response
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER ERROR',
            details: err.details || null
        }
    });
}

module.exports = errorHandler;