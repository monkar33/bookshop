const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const productsRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const statusRoute = require('./routes/status');
const ordersRoute = require('./routes/orders');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }

app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/status', statusRoute);
app.use('/orders', ordersRoute);
//app.use('/orders/status', ordersRoute);

mongoose.connect(
    'mongodb://localhost:27017/shop',
    {useNewUrlParser: true},
    { useUnifiedTopology: true },
)
.then(() => console.log('MongoDB Connented'))
.catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('hooooome');
})

app.listen(5000);