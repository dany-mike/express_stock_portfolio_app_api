const router = require('express').Router();
const serialization = require('../middlewares/serialization.middleware');
const getIntradayUpdate = require('../controllers/marketstack/getIntradayUpdate.controller');
const getEndOfDay = require('../controllers/marketstack/getEndOfDay.controller');

router.get('/eod-price/:symbol/', getEndOfDay , serialization);
router.get('/intraday-price/:symbol/', getIntradayUpdate, serialization);

module.exports = router;