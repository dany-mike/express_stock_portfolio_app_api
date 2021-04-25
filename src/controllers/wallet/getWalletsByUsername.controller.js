const Wallet = require('../../models/Wallet.model');
const User = require('../../models/User.model')

async function getWalletsByUsername(req, res, next) {

    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exist`
        return next();
    }

    try {
        const wallet = await Wallet.find({user: user._id})
        res.rawStatus = 200;
        res.rawResponse = wallet;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = getWalletsByUsername;