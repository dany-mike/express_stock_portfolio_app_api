const router = require('express').Router()
const addStockToWallet = require('../controllers/stock/addStockToWallet.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')

router.post('/add-stock/:user_id/:symbol/',verify, addStockToWallet, serialization)

// router.patch('/edit-stock/')

module.exports = router