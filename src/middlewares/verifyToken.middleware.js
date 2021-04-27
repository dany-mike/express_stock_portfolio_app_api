const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).send('Access denied you are not logged in');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        return next();
    } catch(err) {
        res.status(400).send("invalid Token");
    }
}

module.exports = verifyToken