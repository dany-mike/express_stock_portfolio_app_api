const User = require('../../models/User.model');
const validation  = require('../../utils/validation.util');
const bcrypt = require('bcryptjs');
const Wallet = require('../../models/Wallet.model') 


async function register(req, res, next) {

    // Validation
    const validate = validation.registerValidation(req.body)

    if(validate.error) {
        res.rawStatus = 400
        res.rawResponse = validate.error.details[0].message
        return next();
    }

    // Check if the email is already in the db
    const isEmail = await User.findOne({email: req.body.email})

    if(isEmail) {
        res.rawStatus = 400
        res.rawResponse = "Email already exists"
        return next();
    }

    // Check if the username is available in the db
    const isUsername = await User.findOne({username: req.body.username})

    if(isUsername) {
        res.rawStatus = 400
        res.rawResponse = "This username is no longer available"
        return next();
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: `+33${req.body.phone}`
    });

    // Create a Wallet for this new User
    const wallet = new Wallet({
        walletName: req.body.username +"'s wallet",
        description: `The first wallet of ${req.body.username}`,
        user: user._id,
    })

    try {
        await user.save();
        await wallet.save();
        res.rawStatus = 200;
        res.rawResponse = { user: user._id };
        return next()
    } catch(err) {
        res.rawStatus = 500
        res.rawResponse = err.message
        return next()
    }
}

module.exports = register