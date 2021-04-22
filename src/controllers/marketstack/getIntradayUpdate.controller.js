const marketstack = require('../../services/marketstack.service.js')

async function getIntradayUpdate(req, res, next) {
    try {
        res.rawResponse = await marketstack.get(`/intraday?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`);
        res.rawStatus = 200;
        return next();
    }
    catch(err) {
        res.rawResponse = err.message;
        res.rawStatus = 500;
        return next();
    }
}

module.exports = getIntradayUpdate