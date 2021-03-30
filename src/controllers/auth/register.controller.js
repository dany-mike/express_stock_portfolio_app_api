function register(req, res, next) {
    res.rawResponse = "Registered"
    return next()
}

module.exports = register