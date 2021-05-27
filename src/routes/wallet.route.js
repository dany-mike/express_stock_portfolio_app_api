const router = require('express').Router()
const addStockToWallet = require('../controllers/wallet/addStockToWallet.controller')
const createWallet = require('../controllers/wallet/createWallet.controller')
const deleteStock = require('../controllers/wallet/deleteStock.controller')
const deleteWallet = require('../controllers/wallet/deleteWallet.controller')
const editStock = require('../controllers/wallet/editStock.controller')
const editWallet = require('../controllers/wallet/editWallet.controller')
const getWalletsByUsername = require('../controllers/wallet/getWalletsByUsername.controller')
const getWalletContent = require('../controllers/wallet/getWalletContent.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('../middlewares/verifyToken.middleware')
const getWalletById = require('../controllers/wallet/getWalletById.controller')
const getStockById = require('../controllers/wallet/getStockById.controller')
const getWalletAllocation = require('../controllers/wallet/getWalletAllocation.controller')

//Create a wallet 
router.post('/add-wallet/:username', verify, createWallet, serialization)

//Update a wallet
router.patch('/edit-wallet/:username/:walletId', verify ,editWallet, serialization)

//Delete a wallet
router.delete('/delete-wallet/:username/:walletId', verify, deleteWallet, serialization)

// Get wallets by username
router.get('/:username/', verify, getWalletsByUsername, serialization)

// Get wallet allocation
router.get('/allocation/:username/:walletId/', verify, getWalletAllocation, serialization)

// Get wallet by id
router.get('/get-wallet/:username/:walletId', verify, getWalletById, serialization)

// Watch the content of one wallet
router.get('/:username/:walletId', verify, getWalletContent, serialization)

// Get stock into a wallet by username wallet id and symbol
router.get('/get-stock/:username/:walletId/:symbol', verify, getStockById, serialization)

// Add stock into a wallet by username wallet id and symbol
router.post('/add-stock/:username/:walletId/:symbol', verify, addStockToWallet, serialization)

// Update a stock username and wallet id and symbol
router.patch('/edit-stock/:username/:walletId/:symbol', verify, editStock, serialization)

// Delete a stock by username walletId and symbol
router.delete('/delete-stock/:username/:walletId/:symbol', verify, deleteStock ,serialization)

module.exports = router