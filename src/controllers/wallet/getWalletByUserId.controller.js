const Wallet = require('../../models/Wallet.model');
const Company = require('../../models/Company.model')

async function getWalletByUserId(req, res, next) {

    try {
        const wallet = await Wallet.findOne({user: req.params.user_id})
        const company = await Company.find({wallet: wallet._id})
        res.rawStatus = 200;
        res.rawResponse = company;
        console.log('test')
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = getWalletByUserId;