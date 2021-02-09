import React, { Component } from 'react';
import Moment from 'moment';
import { v4 as uuid_v4 } from "uuid";
import {Button} from '../styled/ProductsButtons'

class ActiveOrders extends Component {
  state = {
    newStatus : []
  }

  changeStatus = (_id) => {
    if(this.state.newStatus === 'ZREALIZOWANE'){
      this.props.confirmOrder(_id);
      return;
    }
    if(this.state.newStatus === 'ANULOWANE'){
      this.props.cancelOrder(_id);
      return;
    }
  }

  getOrders = () => {
    return this.props.orders
      .filter(o => o.status === this.props.status.find(s => s.name === 'ZATWIERDZONE')._id)
      .map(o => {
        return (
          <tr key = {o._id}>
            <td>{Moment(o.date).format('DD-MM-YYYY')}</td>
            <td>{this.getPrice(o.list)}</td>
            <td>{this.getList(o.list)}</td>
            <td>
              <select id="status" type="text" className="custom-select" onChange={this.handleChangeStat}>
                <option>{this.props.status.find(s => s._id === o.status).name}</option>
                <option>ZREALIZOWANE</option>
                <option>ANULOWANE</option>
              </select>
            </td>
            <td><Button onClick={()=>this.changeStatus(o._id)}>Confirm status change</Button></td>
          </tr>
        )
      })
  }
  
  getPrice = (list) => {
    let price = 0;
    let product;
    list.forEach((p) => {
      product = this.props.products.find(product => product._id === p.product);
      price += (p.amount * product.price);
    })
    return price.toFixed(2);
}

  getList = (list) => {
    let newList = [];
    let product;
    list.forEach((p) => {
      product = this.props.products.find(product => product._id === p.product);
      newList.push(product.name + ' x ' + p.amount)
    })
    return newList.map(p =>
        <p key={uuid_v4()}>{p}</p>
      );
  }

  handleChangeStat = (event) => {
    this.setState({newStatus: event.target.value});
    console.log(this.state.newStatus)
  }

  render() {
    return (
        <React.Fragment>
          <div className="row">
                  <div className="col-10 mx-auto my-2 text-center text-title">
                    <h1 className="text-capitalize font-weight-bold">Active Orders</h1>              
                  </div>
          </div>
          <div className="py-5">
              <div className="contsiner">

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Confirm Date</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">List</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getOrders()}
                  </tbody>
                </table>

              </div>
            </div>
            
        </React.Fragment>
    );
  }  
}
 
export default ActiveOrders;