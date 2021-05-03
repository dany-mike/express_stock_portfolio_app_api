const router = require('express').Router();
const searchValuesByName = require('../controllers/search/searchValueByName.controller');
const serialization = require('../middlewares/serialization.middleware');
const verify = require('../middlewares/verifyToken.middleware')


router.get('/', searchValuesByName , serialization);

module.exports = router;