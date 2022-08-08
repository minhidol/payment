const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string()
        .min(4)
        .max(80)
        .required(),
    name: Joi.string(),
    password: Joi.string()
        .min(8)
        .max(30)
        .required(),
    
    role: Joi.number()
    .min(1)
    .max(6)
    .required(),

    roleDetail: Joi.string()
})

module.exports = userSchema;