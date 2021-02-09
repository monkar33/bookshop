const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    date : { 
            type: Date, 
          //  required: true
         },
    status : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Status', 
        required: true
    },
    username : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    phone : {
        type : String,
        required: true
    },
    list : [{ 
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
               // required: true
            }, 
            amount: {
                type : Number,
               // required: true 
            }
    }]

})

module.exports = mongoose.model('Order', OrderSchema);