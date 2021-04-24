const router = require('express').Router()
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')
const getCompanyProfile = require('../controllers/financialModeling/getCompanyProfile.controller')
const searchCompany = require('../controllers/financialModeling/searchCompany.controller')

router.get('/profile/:symbol/', getCompanyProfile, serialization)
router.get('/search', searchCompany, serialization)

module.exports = router