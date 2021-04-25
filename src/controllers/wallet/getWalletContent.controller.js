const Wallet = require('../../models/Wallet.model');
const User = require('../../models/User.model')
const Company = require('../../models/Company.model')

async function getWalletContent(req, res, next) {

    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exist`
        return next();
    }

    const wallet = await Wallet.findOne({username: req.params.walletId})

    if(!wallet) {
        res.rawStatus = 400
        res.rawResponse = `id ${req.params.walletId} does not exist`
        return next();
    }

    try {
        const companies = await Company.find({wallet: wallet._id})
        res.rawStatus = 200;
        res.rawResponse = companies;
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = getWalletContent;