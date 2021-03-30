const User = require('../../models/User.model');

async function register(req, res, next) {
    // Create a new User instance
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
    // Save into the database
   

}

module.exports = register