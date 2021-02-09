import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Details from './components/Products//Details'; 
import Cart from './components/Cart'; 
import Default from './components/Default'; 

class App extends Component {

  state = {
    products: [],
    categories: [],
    cart: [],
    totalPrice : 0,
    status : []
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/products').then(res => {
      this.setState({
        products: res.data
      })
    });
    axios.get('http://localhost:5000/categories').then(res => {
      this.setState({
        categories: res.data
      })
    });
    axios.get('http://localhost:5000/status').then(res => {
      this.setState({
        status: res.data
      })
    })     
  }

  addProductButtonClicked = (_id) => {
    let product = this.state.products.find(p => p._id === _id)

    if(!product) {
      console.log('This product no longer exists...')
      return
    }

    let cart = [...this.state.cart]
    let productInCart = cart.find(p => p.product._id === _id)

    if(productInCart) {
        productInCart.amount ++;
    }
    else {
      cart.push({product, amount:1});
    }

    this.setState({ totalPrice: this.state.totalPrice + product.price })

    //window.localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({cart: cart});
  }

  deleteProductOneProductClicked = (_id) => {
    let cart = [...this.state.cart]
    let productInCart = cart.find(p => p.product._id === _id)

    if(!productInCart) {
      console.log('This product no longer exists...')
      return
    }

    if(productInCart.amount <= 1) {
      cart = cart.filter(p => p.product._id !== _id);
    }
    else {
      productInCart.amount --;
    }

    this.setState({ totalPrice: this.state.totalPrice - productInCart.product.price });
    this.setState({cart: cart});
  }

  deleteProductButton = (_id) => {
    let cart = [...this.state.cart]
    let productInCart = cart.find(p => p.product._id === _id)

    if(!productInCart) {
      console.log('This product no longer exists...')
      return
    }
    cart = cart.filter(p => p.product._id !== _id);

    this.setState({ totalPrice: this.state.totalPrice - (productInCart.product.price * productInCart.amount) });
    this.setState({cart: cart});
  }

  emptyCart = () => {
    this.setState({cart: []});
    this.setState({totalPrice: 0});
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Switch>
            <Route exact path="/" render={() => {
              return <Shop products={this.state.products} categories={this.state.categories} addToCart={this.addProductButtonClicked}/>
            }}>
            </Route>
            <Route path="/details" component={Details}></Route>
            <Route path="/cart" render={() => {
                return <Cart cart={this.state.cart} 
                            totalPrice={this.state.totalPrice} 
                            addToCart={this.addProductButtonClicked} 
                            deleteOneFromCart={this.deleteProductOneProductClicked}
                            deleteFromCart={this.deleteProductButton}
                            emptyCart={this.emptyCart}
                            status={this.state.status}
                            />
            }}></Route>
            <Route component={Default}></Route>
          </Switch>
        </Router> 
      </div>
             

    );
  }  
}
 
export default App;
