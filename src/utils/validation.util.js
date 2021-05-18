// Validation 
const Joi = require('@hapi/joi');

function registerValidation(data) {

    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(9).required(),
    })

    // Set data in schema
    return schema.validate(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    // Set data in schema
    return schema.validate(data);
}

module.exports = {registerValidation, loginValidation}
