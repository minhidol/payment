const Joi = require('joi');

const permissionCreatedSchema = Joi.object({
    name_feature: Joi.string()
        .required(),
    action_feature: Joi.array()
})

module.exports = permissionCreatedSchema;