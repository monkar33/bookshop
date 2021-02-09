const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name : {
        type : String,
        enum : ['Powieść Obyczajowa', 'Romans', 'Kryminał', 'Fantastyka', 
        'Science Fiction', 'Literatura Faktu', 'Horror', 'Literatura Młodzieżowa',
        'Powieść Historyczna', 'Literatura Piękna', 'Powieść Przygodowa', 'Literatura Popularnonaukowa', 'Literatura Dziecięca'] 
    }
})

module.exports = mongoose.model('Category', CategorySchema);