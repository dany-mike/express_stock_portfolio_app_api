const router = require('express').Router()
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')
const getCompanyProfile = require('../controllers/financialModeling/getCompanyProfile.controller')

router.get('/profile/:symbol/', getCompanyProfile, serialization)

module.exports = router