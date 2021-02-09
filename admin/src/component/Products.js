import React, { Component } from 'react';
import {Button} from '../styled/ProductsButtons'

class Products extends Component {
  state = {
    edit : false,
    product_id : '',
    newPrice: 0,
    newWeight: 0,
    newCategory: ''
  }

  setEditMode = (_id) => {
    this.setState({product_id : _id});
    this.setState({edit: true});
  }

  getCategories = (_id) => {
    return this.props.categories
      .filter(c => c._id !== _id)
      .map((p) => (      
        <option key={p.name}>{p.name}</option>       
      ))
  }

  getProducts = () => {
    if(!this.state.edit) {
      return this.props.products
      .filter(p => this.props.filter(p))
      .map(p => {
        
        return (
          <tr key = {p._id}>
            <td>{p.name}</td>
            <td>{p.desc}</td>
            <td>{p.price}</td>
            <td>{p.weight}</td>
            <td>{this.props.categories.find(c => c._id === p.category).name}</td>
            <td>
             <Button onClick={() => this.setEditMode(p._id)}>Edit</Button>
            </td>
          </tr>
        )
      })
    }
    else {
      let product = this.props.products.find(p => p._id === this.state.product_id); 
      return (
      <tr key = {product._id}>
        <td>{product.name}</td>
        <td>{product.desc}</td>
        <td>
          <input type="text" className="form-control" id="inputPrice" placeholder={product.price} onChange={this.handleChangeProductPrice}/>
        </td>
        <td>
          <input type="text" className="form-control" id="inputWeight" placeholder={product.weight} onChange={this.handleChangeProductWeight}/>
        </td>
        <td>
          <select id="category" type="text" className="custom-select" onChange={this.handleChangeProductCategory}>
            <option>{this.props.categories.find(c => c._id === product.category).name}</option>
            {this.getCategories(product.category)}
          </select>
        </td>
        <td>
          <Button onClick={() => {this.updateProduct(product);
                                  this.setState({edit: !this.state.edit})}}>Save Product Change</Button>
        </td>
      </tr>
    )}
  }

  handleChangeProductPrice = (event) => {
    this.setState({newPrice: event.target.value});
  }

  handleChangeProductWeight = (event) => {
    this.setState({newWeight: event.target.value});
  }

  handleChangeProductCategory = (event) => {
    let category = this.props.categories.find(c => c.name === event.target.value)
    this.setState({newCategory: category._id});
    console.log(this.newCategory);
  }

  updateProduct = (product) => {
    let newProduct = product;
    if(this.state.newPrice > 0) {
      newProduct.price = this.state.newPrice;
    }
    if(this.state.newWeight > 0) {
      newProduct.weight = this.state.newWeight;
    }
    if(this.state.newCategory.length > 0) {
      newProduct.category = this.state.newCategory;
    }

    this.props.updateProduct(newProduct);
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
                      <th scope="col">Weight</th>
                      <th scope="col">Category</th>
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