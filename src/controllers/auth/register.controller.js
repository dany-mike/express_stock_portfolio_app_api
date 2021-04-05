const User = require('../../models/User.model');
const validation  = require('../../utils/validation.util');

async function register(req, res, next) {

    // Validation
    const validate = validation.registerValidation(req.body)

    if(validate.error) {
        res.status(400)
        .send(validate.error.details[0].message)
    }

    // Check if the user is already in the db
    const isEmail = await User.findOne({email: req.body.email})

    if(isEmail) {
        res.status(400).send("Email already exists")
    }

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save()
        res.rawResponse = savedUser
        return next()

    } catch(err) {
        res.rawResponse = res.status(400)
        return next()
    }   
}

module.exports = register