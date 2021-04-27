const router = require('express').Router()
const serialization = require('../middlewares/serialization.middleware')
const verify = require('../middlewares/verifyToken.middleware')
const getCompanyProfile = require('../controllers/financialModeling/getCompanyProfile.controller')
const searchCompany = require('../controllers/financialModeling/searchCompany.controller')

router.get('/profile/:symbol/', verify, getCompanyProfile, serialization)
router.get('/search', verify, searchCompany, serialization)

module.exports = router