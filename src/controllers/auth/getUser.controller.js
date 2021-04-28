const User = require('../../models/User.model');

async function deleteUser(req, res, next) {

    // Check if the username exists
    const user = await User.findOne({_id: req.params.id});
    console.log(user)

    if(!user) {
        res.rawStatus = 500;
        res.rawResponse = "Username does not exists";
        return next();
    }

    try {
        res.rawStatus = 200;
        res.rawResponse = user;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = "An error occured"
        return next()
    }
}

module.exports = deleteUser