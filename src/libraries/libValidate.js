const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.string()
        .alphanum()
        .required()
});

const createTodoSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(100)
        .required(),
});

const updateTodoSchema = Joi.object({
    id: Joi.string()
        .alphanum()
        .required(),
    title: Joi.string()
        .min(3)
        .max(30),
    description: Joi.string()
        .min(3)
        .max(100),
    completed: Joi.boolean()
});

const pageSchema = Joi.object({
    page: Joi.number()
        .integer(),
    limit: Joi.number()
        .integer()
});


module.exports = {
    createTodoSchema,
    updateTodoSchema,
    idSchema,
    pageSchema
}
