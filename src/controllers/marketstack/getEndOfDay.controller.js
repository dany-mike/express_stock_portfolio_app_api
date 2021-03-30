const marketstack = require('../../services/marketstack.service.js')

async function getEndOfDay(req, res, next) {
    res.rawResponse = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
    return next();
}

module.exports = getEndOfDay