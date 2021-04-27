const router = require('express').Router();
const serialization = require('../middlewares/serialization.middleware')
const forecast = require('../services/forecast.service')
const verify = require('../middlewares/verifyToken.middleware')

router.get('/price-target/:symbol', verify, forecast.getPriceTargets, serialization);
router.get('/news-sentiment/:symbol', verify, forecast.getNewsSentimentData, serialization);
router.get('/trending-stock/', verify, forecast.getTrendingStocks, serialization);

module.exports = router