const User = require('../../models/User.model')
const Company = require('../../models/Company.model')
const Wallet = require('../../models/Wallet.model');

async function deleteStock(req, res, next) {

    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exist`
        return next();
    }

    const wallet = await Wallet.findOne({
        user: user._id,
        _id: req.params.walletId
    })

    if(!wallet) {
        res.rawStatus = 400
        res.rawResponse = `WalletId: ${req.params.walletId} does not exist`
        return next();
    }


    const company = await Company.findOne({
        symbol: req.params.symbol,
        wallet: wallet._id
    })

    if(company == null) {
        res.rawStatus = 400;
        res.rawResponse = "This company is not in your wallet !";
        return next();
    }

    try {
        await Company.findOneAndDelete({
            wallet: wallet._id,
            symbol: req.params.symbol
        })
        res.rawStatus = 200;
        res.rawResponse = "Company deleted successfully !";
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = deleteStock;