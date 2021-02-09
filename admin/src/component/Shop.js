import React, {Component} from 'react';
import Products from './Products';

class Shop extends Component {
    state = {
        searchTitle : '',
        searchDesc : '',
        searchCat : ''
      }
    
      getCategories = () => {
        return this.props.categories
          .map((p) => (      
            <option key={p.name}>{p.name}</option>       
          ))
      }
    
      filterProducts = (p) => { 
        return  (p.name.toLowerCase().includes(this.state.searchTitle.toLowerCase()) &&
                p.desc.toLowerCase().includes(this.state.searchDesc.toLowerCase())
                && this.props.categories.some(category => {
                  return (category._id === p.category &&
                          category.name.includes(this.state.searchCat))
                }));
        
      }
    
      handleChangeTitle = (event) => {
        this.setState({searchTitle: event.target.value});
      }
    
      handleChangeDesc = (event) => {
        this.setState({searchDesc: event.target.value});
      }
    
      handleChangeCat = (event) => {
        event.target.value === 'Category' ? this.setState({searchCat: ''}) : this.setState({searchCat: event.target.value})
      }

  render() {
    return (
        <React.Fragment>
          <div className="row">
                  <div className="col-10 mx-auto my-2 text-center text-title">
                    <h1 className="text-capitalize font-weight-bold">All Products</h1>              
                  </div>
          </div>

          <form>
            <div className="form-row">
            <div className="col-4">
              <input id="title" type="text" className="form-control" placeholder="Search Title" onChange={this.handleChangeTitle}/>
            </div>
            <div className="col-4">
              <input id="desc" type="text" className="form-control" placeholder="Search Description" onChange={this.handleChangeDesc}/>
            </div>
            <div className="col-4">
              <select id="cat" type="text" className="custom-select" onChange={this.handleChangeCat}>
                <option >Category</option>
                {this.getCategories()} 
              </select>
            </div>
            </div>
          </form>
          <Products products={this.props.products} 
            categories={this.props.categories} 
            filter={this.filterProducts}
            updateProduct={this.props.updateProduct}/>
      </React.Fragment>
    );
  }  
}

export default Shop;