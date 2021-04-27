const User = require('../../models/User.model')
const Wallet = require('../../models/Wallet.model')

async function getWalletById(req, res, next) {

    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exist`
        return next();
    }

    try {
        const walletItem = await Wallet.findOne({
            _id: req.params.walletId,
            user: user._id
        })
        res.rawStatus = 200;
        res.rawResponse = walletItem;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = getWalletById;