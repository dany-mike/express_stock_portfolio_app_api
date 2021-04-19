const router = require('express').Router();
const register = require('../controllers/auth/register.controller');
const login = require('../controllers/auth/login.controller');
const serialization = require('../middlewares/serialization.middleware');
const verify = require('./verifyToken.route')

router.post('/register', register, serialization)

router.post('/login', login, serialization);

router.patch('/update-password/:username', verify, )

router.delete('/delete/:username')

module.exports = router