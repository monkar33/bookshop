const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { request } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const validation = require('../validation/productValidation');

const router = express.Router();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }
//////////GET////////////
router.get('/', async (req, res) => {
    try{
        const product = await Product.find();
        res.json(product);
    }catch(err){
        res.json({message: err});
    }
});

//////////POST////////////

router.post('/',cors(corsOptions), async (req,res) => {
    let { error } = validation.validateProduct(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(422).send({ 
            message: 'Invalid request', 
          }) 
    }
    else
        try{
            
            const category = await Category.findOne({ _id: ObjectId(req.body.category) });

            const product = new Product({
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                weight : req.body.weight,
                category : ObjectId(category._id)
            });
            const savedProduct = await product.save();
            res.json(savedProduct);
        }catch(err){

            res.json({message: err});
        }
    
});

//////////GET BY ID////////////

router.get('/:productId', async (req, res) => {
    try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    }catch(err){
        res.json({message: err}); 
    }
});

//////////DELETE BY ID////////////
router.delete('/:productId', cors(corsOptions), async (req, res) => {
    try{
        const removedProduct = await Product.deleteOne({_id: req.params.productId});
        res.json(removedProduct);
    }catch(err){
        res.json({message: err}); 
    }
});

//////////UPDATE BY ID////////////
router.put('/:productId', cors(corsOptions), async (req, res) => {
    let { error } = validation.validateProduct(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(422).send({ 
            message: 'Invalid request', 
          }) 
    }
    else
        try{
            const category = await Category.findOne({ _id: ObjectId(req.body.category) });

            const updatedProduct = await Product.updateOne({_id: req.params.productId}, 
                {$set: {
                    name: req.body.name,
                    desc: req.body.desc,
                    price: req.body.price,
                    weight : req.body.weight,
                    category : ObjectId(category._id)}}
                
            );
            res.json(updatedProduct);

        }catch(err){
            res.json({message: err});
        }
});

module.exports = router;