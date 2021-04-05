const User = require('../../models/User.model');

// Validation 
const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required()
})

async function register(req, res, next) {

    // Validate Data
    const validation = schema.validate(req.body);

    if(validation.error) {
        res.send(validation.error.details[0])
    } else {
        res.send("Validation ok !")
    }

    // Create a new User instance
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    // try {
    //     const savedUser = await user.save()
    //     res.rawResponse = savedUser
    //     return next()

    // } catch(err) {
    //     res.rawResponse = res.status(400)
    //     return next()
    // }
    // Save into the database
   

}

module.exports = register