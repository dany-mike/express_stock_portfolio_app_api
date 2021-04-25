const Wallet = require('../../models/Wallet.model');
const Company = require('../../models/Company.model')

async function getWalletsByUserId(req, res, next) {

    try {
        const wallet = await Wallet.find({user: req.params.user_id})
        res.rawStatus = 200;
        res.rawResponse = wallet;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = getWalletsByUserId;