const Company = require('../../models/Company.model')
const Wallet = require('../../models/Wallet.model');

async function deleteStock(req, res, next) {

    const wallet = await Wallet.findOne({user: req.params.user_id})

    const company = await Company.findOne({wallet: wallet._id})

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