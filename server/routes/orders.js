const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Status = require('../models/Status');
const ObjectId = require('mongoose').Types.ObjectId;
const validation = require('../validation/orderValidation');

const router = express.Router();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }


//////////GET////////////
router.get('/', cors(corsOptions), async (req, res) => {
    try{
        const order = await Order.find();
        res.json(order);
    }catch(err){
        res.json({message: err});
    }
});

//////////GET BY STATUS////////////
router.get('/status/:statusId', cors(corsOptions), async (req, res) => {
    try{
        const order = await Order.find({status : ObjectId(req.params.statusId)});
        res.json(order);
    }catch(err){
        res.json({message: err});
    }
});

//////////POST////////////

router.post('/', async (req,res) => {
    
   // const product = await Product.findOne({ _id: ObjectId(req.body.list) });
    const status = await Status.findOne({ name:'ZATWIERDZONE' });
    if (!status) {
        return res.status(404).send('Error occured during creating an order.');
    }
   // const newList = [...new Set(req.body.list.map(p => p.product))];
   let { error } = validation.validateOrder(req.body);
   if (error) {
       console.log(error.details[0].message);
       return res.status(422).send({ 
           message: 'Invalid request', 
         }) 
   }
    const order = new Order({
        date : req.body.date,
        status : ObjectId(status._id),
        username : req.body.username,
        email : req.body.email,
        phone : req.body.phone,
        list : req.body.list.map(p => {
            return { 
                product: ObjectId(p.product),
                amount: p.amount
            }})
    });
    try{
        const savedOrder = await order.save();
        res.json(savedOrder);
    }catch(err){
        res.json({message: err});
    }
    
});

//////////UPDATE BY ID////////////
router.put('/:orderId/status', cors(corsOptions), async (req, res) => {
    let flag = 0;
    let { error } = validation.validateUpdatedOrder(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(422).send({ 
            message: 'Invalid request', 
          }) 
    }

    const order = await Order.findOne({_id: req.params.orderId});
    if (!order) {
        console.log('Order not found');
        return res.status(404).send('Order not found');
    }

    const oldStatus = await Status.findOne({ _id: ObjectId(order.status) });
    if (!oldStatus) {
        console.log('Old status not found');
        return res.status(404).send('Old status not found');
    }

    const newStatus = await Status.findOne({ _id: ObjectId(req.body.status) });
    if (!oldStatus) {
        console.log('New status not found');
        return res.status(404).send('New status not found');
    }

    if(oldStatus.name === 'ZREALIZOWANE') {
        flag = 1;
        return res.status(400).send('You cannot change realized order');
    }

    if(oldStatus.name === 'ANULOWANE') {
        flag = 1;
        return res.status(400).send('You cannot change canceled order');
    }
    if(flag === 0) {
        try{
            const updatedOrder = await Order.updateOne({_id: req.params.orderId}, {$set: { status : ObjectId(newStatus._id)}});
            res.json(updatedOrder);
        }catch(err){
            res.json({message: err});
        }
    }
   

});


module.exports = router;