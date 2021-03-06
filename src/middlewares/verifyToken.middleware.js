const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {

    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send('Access denied you are not logged in');
    }


    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return next();
    } catch(err) {
        res.status(400).send("invalid Token");
    }
}

module.exports = verifyToken