const router = require('express').Router()
const addStockToWallet = require('../controllers/wallet/addStockToWallet.controller')
const createWallet = require('../controllers/wallet/createWallet.controller')
const deleteStock = require('../controllers/wallet/deleteStock.controller')
const deleteWallet = require('../controllers/wallet/deleteWallet.controller')
const editStock = require('../controllers/wallet/editStock.controller')
const editWallet = require('../controllers/wallet/editWallet.controller')
const getWalletsByUserId = require('../controllers/wallet/getWalletsByUserId.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')

//Create wallet by username
router.post('/add-wallet/:username', verify, createWallet, serialization)

//Update a wallet
router.patch('/edit-wallet/:username/:walletId', editWallet, serialization)

//Delete a wallet
router.delete('/delete-wallet/:username/:walletId', deleteWallet, serialization)

// Get wallets by user_id
router.get('/:user_id/',verify, getWalletsByUserId, serialization)

// Watch the content of one wallet

// Add into a wallet by user_id and wallet id
router.post('/add-stock/:user_id/:symbol',verify, addStockToWallet, serialization)

// Update a wallet by user_id and wallet id
router.patch('/edit-stock/:user_id/:symbol', verify, editStock, serialization)

// Delete a wallet by user_id and wallet id
router.delete('/delete-stock/:user_id/:symbol', verify, deleteStock ,serialization)

module.exports = router