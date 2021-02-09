import React, { Component } from 'react';


class Orders extends Component {
    state = {
        searchStat : ''
    }
    
      getStatus = () => {
        return this.props.status
          .map((s) => (      
            <option key={s.name}>{s.name}</option>       
          ))
      }

      getOrders = () => {
        return this.props.orders
        .filter(o => this.filterOrders(o))
        .map(o => {
            return (
            <tr key = {o._id}>
                <td>{this.props.status.find(s => s._id === o.status).name.toLowerCase()}</td>
                <td>{o.username}</td>
                <td>{o.email}</td>
                <td>{o.phone}</td>
                <td> 
                    {this.getPrice(o.list)}
                </td>
                <td>
                {/* <Button onClick={() => this.props.addToCart(p._id)}>Add to Cart</Button> */}
                </td>
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
    
      filterOrders = (o) => { 
        if(this.state.searchStat !== '') {
          return  (this.props.status.some(status => {
            return ((status._id === o.status && status.name === this.state.searchStat) || (status._id === o.status && this.state.searchStat === 'STATUS') )
                  }));
        }
        else return this.props.status;
                
      }
    
      handleChangeStat = (event) => {
        //event.target.value === 'STATUS' ? this.setState({searchSat: ''}) : this.setState({searchStat: event.target.value});
        this.setState({searchStat: event.target.value});
      }

  render() {
    return (
        <React.Fragment>
          <div className="row">
                  <div className="col-10 mx-auto my-2 text-center text-title">
                    <h1 className="text-capitalize font-weight-bold">All Orders</h1>              
                  </div>
          </div>

          <form>
            <div className="col-10">
            <div className="p-2">
              <select id="status" type="text" className="custom-select" onChange={this.handleChangeStat}>
                <option>STATUS</option>
                {this.getStatus()} 
              </select>
            </div>
            </div>
          </form>

          <div className="py-5">
              <div className="contsiner">

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Price</th>
                      <th scope="col"/>
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

export default Orders;