import React, { Component } from 'react';
import {Button, OrderButton} from '../styled/ProductsButtons'
import axios from 'axios'

class Cart extends Component {

  state = {
    show: false,
    username : '',
    email: '',
    phone: '',
    error: '',
    success: false
  }
  

  handleChangeUsername = (event) => {
    this.setState({username: event.target.value});
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleChangePhone = (event) => {
    this.setState({phone: event.target.value});
  }

  emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  verifyPersonalForm = () => {
    this.setState({error: ''});

    if(this.state.username.length === 0){
      this.setState({error: 'User name cannot be empty.'})
      return;
    } 
    if(this.state.email.length === 0){
      this.setState({error: 'User email cannot be empty.'})
      return;
    } 
    if(this.state.phone.length === 0){
      this.setState({error: 'User phone number cannot be empty.'})
      return;
    } 
    if(!this.emailIsValid(this.state.email)){
      this.setState({error: 'Email is invalid'})
      return;
    }
    if(!/^[0-9]+$/.test(this.state.phone)){
      this.setState({error: 'Phone number is invalid'})
      return;
    }
    else{
      this.postOrderHandler();
      return;
    }
  }

  postOrderHandler = () => {
    let newStatus = (this.props.status.find(s => s.name === "ZATWIERDZONE")._id);
    let order = {
      date : Date.now(),
      status : newStatus,
      username : this.state.username,
      email : this.state.email,
      phone : this.state.phone,
      list : this.props.cart.map(p => {
        return {
          product: p.product._id,
          amount: p.amount
        }
      })
    }

    console.log(order)
  
    axios.post('http://localhost:5000/orders', order)
    .then(response => {
      console.log(response);
      this.props.emptyCart();
      this.setState({show: false});
      this.setState({success: true});
    })
    .catch(error => {
      this.setState({error: "Something went wrong."});
    });
  }

  getCart = () => {
    return this.props.cart.map(p => {
      return (
        <tr key={p.product._id}>
          <td>{p.product.name}</td>
          <td>{p.product.desc}</td>
          <td>
              <button onClick={() => this.props.addToCart(p.product._id)}>+</button>
              <b> {p.amount} </b>
              <button onClick={() => this.props.deleteOneFromCart(p.product._id)}>-</button>
          </td>
          <td> {(p.product.price * p.amount).toFixed(2)} </td>
          <td>
            <Button onClick={() => this.props.deleteFromCart(p.product._id)}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  showForm = () => {
    if(this.props.cart.length !== 0){
      this.setState({show: true});
    }
    
  }

  showSuccess = () => {
    return (
      0
    );
  }

  render() {
    
    let personalForm;
    let cart;
    let success;
    if(this.state.show) {
      personalForm = 
        <div>
          <form className="py-5">
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label text-center">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputName" placeholder="Name" onChange={this.handleChangeUsername}/>
              </div>
            </div>
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label text-center">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputemail" placeholder="Email" onChange={this.handleChangeEmail}/>
              </div>
            </div>
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label text-center">Phone Number</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputPhone" placeholder="Phone Number" onChange={this.handleChangePhone}/>
              </div>
            </div>
            <small className="col-10 text-center" style={{ color: 'red', textAlign: "center"}}>{this.state.error}</small>
          </form>
          <OrderButton onClick={this.verifyPersonalForm}>Confirm</OrderButton>
        </div>
    } 
    if(!this.state.success) {
      cart = <div>
        <div className="row">
                  <div className="col-10 mx-auto my-2 text-center text-title">
                    <h1 className="text-capitalize font-weight-bold">Products in cart</h1>              
                  </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.getCart()}
            </tbody>           
          </table>
          <div className="text-center"><b>Total Price: </b>{this.props.totalPrice.toFixed(2)}</div>
          <OrderButton onClick={this.showForm}>Order</OrderButton>
      </div>
    }
    if(this.state.success){
      success = <div>
        <h1 style={{ color: 'var(--mainBlue)', textAlign: "center"}} >Order completed</h1>
      </div>
    }

    return (
      <div>
          {cart}
          {personalForm}
          {success}         
      </div>
    );
  }  
}
 
export default Cart;