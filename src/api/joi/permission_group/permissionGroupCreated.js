const Joi = require('joi');

const permissionCreatedSchema = Joi.object({
    name: Joi.string()
        .required(),
    type: Joi.number(),
    menu: Joi.array(),
    action: Joi.array()
})

module.exports = permissionCreatedSchema;