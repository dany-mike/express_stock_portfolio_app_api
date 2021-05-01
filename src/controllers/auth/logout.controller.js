function logout(req, res, next) {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).send('user is logged out');
}

module.exports = logout;