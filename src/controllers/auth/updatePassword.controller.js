const User = require('../../models/User.model');
const bcrypt = require('bcryptjs');

async function updatePassword(req, res, next) {

    // Check if the username exists
    const user = await User.findOne({username: req.params.username});
    if(!user) {
        res.rawStatus = 400;
        res.rawResponse = "Can't update this username does not exists";
        return next();
    }

    const filter = await {username: req.params.username};
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const updatedHashedPassword = await {password: hashedPassword};

    try{
        await User.findOneAndUpdate(filter, updatedHashedPassword);
        const msg = {
            msg: "password successfully updated",
            username: req.params.username
        }
        res.rawStatus = 200;
        res.rawResponse = msg;
        return next();

    } catch (err) {
        res.rawStatus = 500
        res.rawResponse = err.message
    }
}

module.exports = updatePassword