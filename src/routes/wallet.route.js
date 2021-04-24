const router = require('express').Router()
const getWalletByUserId = require('../controllers/wallet/getWalletByUserId.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')

router.get('/:user_id/',verify, getWalletByUserId, serialization)

// router.patch('/edit-stock/')

module.exports = router