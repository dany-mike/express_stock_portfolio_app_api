function checkUser(req, res) {
    const token = req.headers.authorization;

    if(token === '' || !token) {
        return res.send(false);
    }
    try {
        res.send(true)
    } catch(err) {
        res.status(400).send(false);
    }
}

module.exports = checkUser