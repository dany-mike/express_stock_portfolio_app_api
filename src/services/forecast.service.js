// Documentation below
// https://github.com/janlukasschroeder/tipranks-api-v2

const tipranksApi = require('tipranks-api-v2');

function getPriceTargets (req, res, next) {
    tipranksApi.getPriceTargets(req.params.symbol)
    .then(response => {
        res.rawResponse = response
        res.rawStatus = 200;
        return next()
    }).catch(error => console.log(error))
}

function getNewsSentimentData (req, res, next) {
    tipranksApi.getNewsSentimentData(req.params.symbol)
    .then(response => {
        res.rawResponse = response
        res.rawStatus = 200;
        return next()
    }).catch(error => console.log(error))
}

function getTrendingStocks (req, res, next) {
    tipranksApi.getTrendingStocks()
    .then(response => {
        res.rawResponse = response
        res.rawStatus = 200;
        return next()
    }).catch(error => console.log(error))
}

module.exports = {getPriceTargets, getNewsSentimentData, getTrendingStocks}