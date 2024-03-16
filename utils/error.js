class DetailError extends Error {
    constructor(code, msg) {
        super(msg);
        this.status_code = code;
    }
}

class UserError extends DetailError {
    constructor(msg) {
        super(400, msg);
    }
}

const errorHandler = (err, req, res, next) => {
    const status_code = err.status_code || 500;

    return res.status(status_code).json({
        status: "error",
        detail: err.message
    })
}

module.exports = {
    DetailError,
    UserError,
    errorHandler
}
