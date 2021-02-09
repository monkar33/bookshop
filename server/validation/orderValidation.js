const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const orderSchema = Joi.object({
    date : Joi.date()
        .required(),
    status : Joi.objectId()
    .required(),
    username : Joi.string().
        required(),
    email : Joi.string()
        .email()    
        .required(),
    phone : Joi.number()
        .required(), 
    list : Joi.array().items({
        product: Joi.objectId()
            .required(), 
        amount: Joi.number()
            .integer()
            .greater(0)
            .required()
    }).min(1)
    .required()
})


const validateOrder = (product) => {
    return orderSchema.validate(product)
}

const updatedOrderSchema = Joi.object({
    status: Joi.objectId()
    .required()
})

const validateUpdatedOrder = (product) => {
    return updatedOrderSchema.validate(product)
}

module.exports.validateOrder = validateOrder;
module.exports.validateUpdatedOrder = validateUpdatedOrder;