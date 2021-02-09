const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    name : {
        type : String,
        enum : ['NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'] 
    }
})

module.exports = mongoose.model('Status', StatusSchema);