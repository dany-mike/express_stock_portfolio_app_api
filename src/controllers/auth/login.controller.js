const validation  = require('../../utils/validation.util');
const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res, next) {

    // Check if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) {

        if(req.body.email === "") {
            res.rawStatus = 400;
            res.rawResponse = "Email field is required";
            return next();
        }

        if(req.body.password === "") {
            res.rawStatus = 400;
            res.rawResponse = "Password field is required";
            return next();
        }

        res.rawStatus = 400;
        res.rawResponse = "Email or password is not correct";
        return next();
    }

    // Check Password


    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        if(req.body.password !== "") {
            res.rawStatus = 400;
            res.rawResponse = "Email or password is not correct";
            return next();
        } else {
            res.rawStatus = 400;
            res.rawResponse = "Password field is required";
            return next();
        }     
    }
        // Create and add a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
            expiresIn: '4h' // expires in four hours
        })

        res.header('auth-token', token)

        res.rawStatus = 200;
        res.rawResponse = token;
        return next();
}

module.exports = login