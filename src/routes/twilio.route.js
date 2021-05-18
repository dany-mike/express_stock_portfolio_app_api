const router = require('express').Router();
const sendMessageSubscription = require('../controllers/twilio/sendMessageSubscription.controller');
const serialization = require('../middlewares/serialization.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');

router.post('/subscribed/:username/:symbol', verifyToken, sendMessageSubscription, serialization);

module.exports = router