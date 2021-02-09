const express = require('express');
const Status = require('../models/Status');

const router = express.Router();

//////////GET////////////
router.get('/', async (req, res) => {
    try{
        const status = await Status.find();
        res.json(status);
    }catch(err){
        res.json({message: err});
    }
});

//////////POST////////////

// router.post('/', async (req,res) => {
//     const status = new Status({
//         name: req.body.name,
//     });
//     try{
//         const savedStatus = await status.save();
//         res.json(savedStatus);
//     }catch(err){
//         res.json({message: err});
//     }
    
// });

module.exports = router;