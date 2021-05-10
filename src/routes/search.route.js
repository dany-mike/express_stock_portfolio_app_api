const router = require('express').Router();
const searchValuesByName = require('../controllers/search/searchValueByName.controller');
const serialization = require('../middlewares/serialization.middleware');
const getCompanyNameByTicker = require('../controllers/search/getCompanyNameByTicker.controller')

router.get('/', searchValuesByName , serialization);

// Company name by ticker controller
router.get('/company-name/:symbol', getCompanyNameByTicker, serialization)

module.exports = router;