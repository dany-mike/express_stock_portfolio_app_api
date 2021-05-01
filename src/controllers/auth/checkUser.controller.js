function checkUser(req, res) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).send(false);
    }

    try {
        res.status(200).send(true)
    } catch(err) {
        res.status(400).send(false);
    }
}

module.exports = checkUser