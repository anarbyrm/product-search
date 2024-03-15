exports.errorHandler = (err, req, res, next) => {
    return res.json({
        status: "error",
        detail: err.message
    })
}
