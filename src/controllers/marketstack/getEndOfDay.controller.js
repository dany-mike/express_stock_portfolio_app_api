const marketstack = require('../../services/marketstack.service.js')

async function getEndOfDay(req, res, next) {
    try {
        res.rawResponse = await marketstack.get(`/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
        res.rawStatus = 200;
        return next();
    } catch(err) {
        res.rawResponse = err.message;
        res.rawStatus = 500;
        return next();
    }
}

module.exports = getEndOfDay