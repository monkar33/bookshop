const express = require('express');
const Category = require('../models/Category');


const router = express.Router();

//////////GET////////////
router.get('/', async (req, res) => {
    try{
        const category = await Category.find();
        res.json(category);
    }catch(err){
        res.json({message: err});
    }
});

//////////POST////////////

// router.post('/', async (req,res) => {
//     const category = new Category({
//         name: req.body.name,
//     });
//     try{
//         const savedCategory = await category.save();
//         res.json(savedCategory);
//     }catch(err){
//         res.json({message: err});
//     }
    
// });

module.exports = router;