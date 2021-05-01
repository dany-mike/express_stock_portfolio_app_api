function logout(req, res, next) {
    res.cookie('token', '', {
        expires: new Date(Date.now() + 10 * 1),
        httpOnly: true
    });
    res.status(200).send('user is logged out');
}

module.exports = logout;