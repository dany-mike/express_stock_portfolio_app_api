const router = require('express').Router();
const register = require('../controllers/auth/register.controller');
const serialization = require('../middlewares/serialization.middleware')

router.post('/register', register, serialization)

module.exports = router