const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    desc: Joi.string()
        .min(3)
        .required(),
    price: Joi.number()
        .greater(0)
        .required(),
    weight : Joi.number()
        .greater(0)
        .required(),
    category : Joi.objectId()
        .required()
})


const validateProduct = (product) => {
    return productSchema.validate(product)
}

module.exports.validateProduct = validateProduct;