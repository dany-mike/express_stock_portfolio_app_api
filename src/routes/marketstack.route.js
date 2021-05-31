const router = require('express').Router();
const serialization = require('../middlewares/serialization.middleware');
const verify = require('../middlewares/verifyToken.middleware')
const getEndOfDay = require('../controllers/marketstack/getEndOfDay.controller');


router.get('/eod-price/:symbol/',verify, getEndOfDay , serialization);

module.exports = router;