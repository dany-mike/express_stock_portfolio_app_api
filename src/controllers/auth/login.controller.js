const validation  = require('../../utils/validation.util');
const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res, next) {

    // Validation
    const validate = await validation.loginValidation(req.body);

    if(validate.error) {
        res.rawStatus = 400;
        res.rawResponse = validate.error.details[0].message;
        return next();
    }

    // Check if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        res.rawStatus = 400;
        res.rawResponse = "Email or password is wrong";
        return next();
    }

    // Check Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        res.rawStatus = 400;
        res.rawResponse = "Email or password is wrong";
        return next();
    }

    // Create and add a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token)

    res.rawStatus = 200;
    res.rawResponse = "Logged in!";
    return next();
}

module.exports = login