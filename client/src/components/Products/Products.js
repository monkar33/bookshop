import React, { Component } from 'react';

import {Button} from '../../styled/ProductsButtons'

class Products extends Component {


  getProducts = () => {
    return this.props.products
      .filter(p => this.props.filter(p))
      .map(p => {
        return (
          <tr key = {p._id}>
            <td>{p.name}</td>
            <td>{p.desc}</td>
            <td>{p.price}</td>
            <td>
              <Button onClick={() => this.props.addToCart(p._id)}>Add to Cart</Button>
            </td>
          </tr>
        )
      })
  }
        

  render() {
    return (
        <React.Fragment>
          
            <div className="py-5">
              <div className="contsiner">

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col"/>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getProducts()}
                  </tbody>
                </table>

              </div>
            </div>
        </React.Fragment>
    );
  }  
}
 
export default Products;