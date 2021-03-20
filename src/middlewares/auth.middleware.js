function auth(req, res, next) {
    if(req.headers.Authorization) {
        return next();
    } else {
        res.status(403).send("access denied");
    }
}

module.exports = auth;