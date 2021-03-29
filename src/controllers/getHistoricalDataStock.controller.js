const marketstack = require('../services/marketstack.service.js')

module.exports = async function getHistoricalDataStock(req, res, next) {
    res.rawResponse = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}&date_from=${req.params.from}&date_to=${req.params.to}`);
    return next();
}
