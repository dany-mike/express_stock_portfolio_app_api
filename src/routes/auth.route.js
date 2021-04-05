const router = require('express').Router();
const register = require('../controllers/auth/register.controller');
const login = require('../controllers/auth/login.controller')
const serialization = require('../middlewares/serialization.middleware')

router.post('/register', register, serialization)

router.post('/login', login, serialization);

module.exports = router