const users = [
    {
        name: 'username'
    },
    {
        name: 'name'
    }
];

function getUsers(req, res, next) {
    res.json(users);
    res.rawResponse = users;
    return next()
}

function userLogin(req, res, next) {
    const user = {
        name: req.body.name,
        password: req.body.password
    }

    users.push(user);
    res.rawResponse = res.status(201).send();
    return next();
}

module.exports = {getUsers, userLogin};