const router = require('express').Router();
const updateAllStocks = require('../controllers/stocks/updateAllStocks.controller');
const serialization = require('../middlewares/serialization.middleware');

// Update stock prices
router.patch('/update-all', updateAllStocks, serialization)

module.exports = router;