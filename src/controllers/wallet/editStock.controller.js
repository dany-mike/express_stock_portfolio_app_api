const Company = require('../../models/Company.model')
const Wallet = require('../../models/Wallet.model');
const marketstack = require('../../services/marketstack.service.js')
const tipranksApi = require('tipranks-api-v2');

async function editStock(req, res, next) {

    const stockPrice = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
    const forecastPrice = await tipranksApi.getPriceTargets(req.params.symbol)
    .then(response => {
        return response
    }).catch(error => console.log(error))
    
    const wallet = await Wallet.findOne({user: req.params.user_id})

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