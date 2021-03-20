function getHistoricalDataStock(req, res, next) {
    
    const axios = require('axios');

    const config = {
        method: 'get',
        url: `http://api.marketstack.com/v1/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}&date_from=${req.params.from}&date_to=${req.params.to}`,
        headers: { 
            'Authorization': `token ${process.env.API_KEY_MARKETSTACK}`
        }
    };

    axios(config)
    .then(function (response) {
        // => rawResponse to serialization middleware
        res.rawResponse = response.data;
        return next();
    })
    .catch(function (error) {
        res.rawResponse = error.message;
        return next();
    });
  
}

module.exports = getHistoricalDataStock