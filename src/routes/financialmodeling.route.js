const router = require('express').Router()

const serialization = require('../middlewares/serialization.middleware')
const verify = require('../middlewares/verifyToken.middleware')
const getCompanyProfile = require('../controllers/financialModeling/getCompanyProfile.controller')

router.get('/profile/:symbol/', verify, getCompanyProfile, serialization)

module.exports = router