const Company = require('../../models/Company.model')
const Wallet = require('../../models/Wallet.model');
const marketstack = require('../../services/marketstack.service.js')
const financialModeling = require('../../services/financialModeling.service')
const tipranksApi = require('tipranks-api-v2');

async function addStockToWallet(req, res, next) {

    const stockPrice = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
    const companyName = await financialModeling.get(`/profile/${req.params.symbol}?apikey=${process.env.API_KEY_FINANCIAL_MODELING}`)
    const forecastPrice = await tipranksApi.getPriceTargets(req.params.symbol)
    .then(response => {
        return response
    }).catch(error => console.log(error))
    
    const wallet = await Wallet.findOne({user: req.params.user_id})

    const isInMyWallet = await Company.find({wallet: wallet._id})

    for (const wallet of isInMyWallet) {
        if(wallet.companyName == companyName[0].companyName) {
            res.rawResponse = "You already have this company in your wallet !"
            res.rawStatus = 400
            return next();
        }
    }

    // Create a new company
    const company = new Company({
        companyName: companyName[0].companyName,
        symbol: req.params.symbol,
        sharesNumber: req.body.sharesNumber,
        stockPrice: stockPrice.data[0].open,
        about: companyName[0].description,
        activityArea: companyName[0].industry,
        wallet: wallet._id,
        forecastPrice: forecastPrice.priceTargets.mean,
    });

    try {
        await company.save();
        res.rawStatus = 200;
        res.rawResponse = "Company saved into the wallet successfully";
        return next();
    } catch(err) {
        res.rawStatus = 500;
        res.rawResponse = err.message;
        return next();
    }
}

module.exports = addStockToWallet;