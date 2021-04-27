const router = require('express').Router();
const register = require('../controllers/auth/register.controller');
const login = require('../controllers/auth/login.controller');
const serialization = require('../middlewares/serialization.middleware');
const verify = require('../middlewares/verifyToken.middleware');
const updatePassword = require('../controllers/auth/updatePassword.controller');
const deleteUser = require('../controllers/auth/deleteUser.controller');

router.post('/register', register, serialization)

router.post('/login', login, serialization);

router.patch('/update-password/:username', verify, updatePassword, serialization);

router.delete('/delete-user/:username', verify, deleteUser, serialization);

module.exports = router