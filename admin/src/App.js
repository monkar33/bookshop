import './App.css';
import Navbar from './component/Navbar';
import Shop from './component/Shop';
import Orders from './component/AllOrders'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ActiveOrders from './component/ActiveOrders';

class App extends Component {
  state = {
    products: [],
    categories: [],
    orders: [],
    status: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/products')
      .then(res => {
      this.setState({
        products: res.data
      })
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    });
    axios.get('http://localhost:5000/orders')
      .then(res => {
      this.setState({
        orders: res.data
      })
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    });
    axios.get('http://localhost:5000/categories')
      .then(res => {
      this.setState({
        categories: res.data
      })
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    });
    axios.get('http://localhost:5000/status')
      .then(res => {
      this.setState({
        status: res.data
      })
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    })     
  }

  cancelOrder = (_id) => {
    let status = this.state.status.find(s => s.name === 'ANULOWANE');
    if(!status) {
      console.log('Status is wrong');
      return;
    }
    let newOrders = [...this.state.orders]
    let order = newOrders.find(o => o._id === _id);

    if(!order){
      console.log('Order id is wrong');
      return;
    }   
    order.status = status._id;

    axios.put(`http://localhost:5000/orders/${order._id}/status`, { "status":order.status })
      .then(response => {
        console.log(response);
        this.setState({ orders: newOrders });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      });
  }

  confirmOrder = (_id) => {
    let status = this.state.status.find(s => s.name === 'ZREALIZOWANE');
    if(!status) {
      console.log('Status is wrong');
      return;
    }
    let newOrders = [...this.state.orders]
    let order = newOrders.find(o => o._id === _id);

    if(!order){
      console.log('Order id is wrong');
      return;
    }   
    order.status = status._id;

    axios.put(`http://localhost:5000/orders/${order._id}/status`, { "status":order.status })
      .then(response => {
        console.log(response);
        this.setState({ orders: newOrders });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      });
  }

  updateProduct = (product) => {
    let products = [...this.state.products];
    let newProduct = products.find(p => p._id === product._id);
    if(!newProduct) {
      console.log('Product not exist');
      return;
    }

    let newProduct2 = {
      name: product.name,
      desc: product.desc,
      price: product.price,
      weight: product.weight,
      category: product.category

    }

    axios.put(`http://localhost:5000/products/${product._id}`, newProduct2)
      .then(response => {
        console.log(response);
        this.setState({products: products});
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      });
  }

  render() {
    return (
      <div>
          <Router>
          <Navbar/>
            <Switch>
              <Route exact path="/" render={() => {
                return <Shop products={this.state.products} 
                  categories={this.state.categories}
                  updateProduct={this.updateProduct}/>
              }}>
              </Route>
              <Route exact path="/orders" render={() => {
                return <Orders orders={this.state.orders} 
                  status={this.state.status}
                  products={this.state.products}/>
              }}>
              </Route>
              <Route exact path="/activeOrders" render={() => {
                return <ActiveOrders 
                  orders={this.state.orders} 
                  status={this.state.status}
                  products={this.state.products}
                  confirmOrder={this.confirmOrder}
                  cancelOrder={this.cancelOrder}/>
              }}>
              </Route>
            </Switch>
          </Router> 
        </div>
    );
  }  
}

export default App;
