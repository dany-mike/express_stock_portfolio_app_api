const router = require('express').Router();
const serialization = require('../middlewares/serialization.middleware');
const getIntradayUpdate = require('../controllers/marketstack/getIntradayUpdate.controller');
const getEndOfDay = require('../controllers/marketstack/getEndOfDay.controller');
const verify = require('./verifyToken.route')


router.get('/eod-price/:symbol/',verify, getEndOfDay , serialization);
router.get('/intraday-price/:symbol/',verify, getIntradayUpdate, serialization);

module.exports = router;