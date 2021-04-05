const validation  = require('../../utils/validation.util');
const User = require('../../models/User.model');
const bcrypt = require('bcryptjs');

async function login(req, res, next) {

    // Validation
    const validate = await validation.loginValidation(req.body)

    if(validate.error) {
        res.rawStatus = 400;
        res.rawResponse = validate.error.details[0].message;
        return next();
    }

    // Check if the email exists
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        res.rawStatus = 400;
        res.rawResponse = "Email is not found";
        return next();
    }

    // Check Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        res.rawStatus = 400;
        res.rawResponse = "Invalid password";
        return next();
    }

    res.rawStatus = 200;
    res.rawResponse = "Logged in!";
    return next();
}

module.exports = login