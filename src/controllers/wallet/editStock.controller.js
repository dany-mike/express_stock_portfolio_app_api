const User = require('../../models/User.model')
const Company = require('../../models/Company.model')
const Wallet = require('../../models/Wallet.model')
const marketstack = require('../../services/marketstack.service.js')
const tipranksApi = require('tipranks-api-v2')

async function editStock(req, res, next) {

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


    const stockPrice = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
    const forecastPrice = await tipranksApi.getPriceTargets(req.params.symbol)
    .then(response => {
        return response
    }).catch(error => console.log(error))
    
    // Update company
    const filter = {
        symbol: req.params.symbol,
        wallet: wallet._id
    };

    const update = {
        sharesNumber: req.body.sharesNumber,
        stockPrice: stockPrice.data[0].open,
        forecastPrice: forecastPrice.priceTargets.mean,
    }

    try {
        await Company.findOneAndUpdate(filter, update)
        res.rawStatus = 200;
        res.rawResponse = "Company updated successfully !";
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = editStock;