const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');
//const category = mongoose.model.('Category');

const ProductSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    desc: {
        type : String,
        required: true
    },
    price: {
        type : Double,
        required: true
    },
    weight : {
        type : Double,
        required: true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema);