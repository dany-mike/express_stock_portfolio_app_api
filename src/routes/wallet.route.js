const router = require('express').Router()
const addStockToWallet = require('../controllers/wallet/addStockToWallet.controller')
const deleteStock = require('../controllers/wallet/deleteStock.controller')
const editStock = require('../controllers/wallet/editStock.controller')
const getWalletByUserId = require('../controllers/wallet/getWalletByUserId.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')

router.get('/:user_id/',verify, getWalletByUserId, serialization)

router.post('/add-stock/:user_id/:symbol',verify, addStockToWallet, serialization)

router.patch('/edit-stock/:user_id/:symbol', verify, editStock, serialization)

router.delete('/delete-stock/:user_id/:symbol', verify, deleteStock ,serialization)

module.exports = router