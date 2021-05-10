const Value = require('../../models/Value.model')

async function getCompanyNameByTicker(req, res, next) {

    const value = await Value.findOne({Symbol: req.params.symbol})

    try {
        res.rawStatus = 200
        res.rawResponse = value
        return next()
    } catch(err) {
        res.rawStatus = 500
        res.rawResponse = err.message
        return next()
    }
}

module.exports = getCompanyNameByTicker
