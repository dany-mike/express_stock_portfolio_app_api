const tipranksApi = require('tipranks-api-v2');

function getPriceTargets(req, res, next) {
    tipranksApi
    .getPriceTargets(req.params.symbol)
    .then(result => {
        res.rawResponse = result;
    }).catch(() => {
        res.rawResponse = res.status(400);
    }).then(()=> next());
}

function getNewsSentimentData(req, res, next) {
    tipranksApi
    .getNewsSentimentData(req.params.symbol)
    .then(result => {
        res.rawResponse = result;
    }).catch(() => {
        res.rawResponse = res.status(400);
    }).then(()=> next());
}



module.exports = {getPriceTargets, getNewsSentimentData}