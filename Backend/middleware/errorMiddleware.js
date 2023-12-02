const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.orginalUrl}`);
    res.status(400);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = err.message;

    //check for mongoose error res

    if (err.name === 'CastError' && err.kind === 'ObjectId'){
        message = `resource not found`;
        statusCode = 404;
    
    }

    res.status(statusCode).json({
        message,

        stack: process.envNODE_ENV === 'prouction'  ? 'null': err.stack,
    })
}

export { notFound, errorHandler };