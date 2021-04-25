const User = require('../../models/User.model');

async function deleteUser(req, res, next) {

    // Check if the username exists
    const user = await User.findOne({username: req.params.username});
    if(!user) {
        res.rawStatus = 400;
        res.rawResponse = "Can't delete this username does not exists";
        return next();
    }

    try {
        await User.findOneAndDelete({username: req.params.username});
        const msg = {
            msg: "User successfuly delete",
            username: req.params.username
        }
        res.rawStatus = 200;
        res.rawResponse = msg;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = "An error occured"
        return next()
    }
}

module.exports = deleteUser