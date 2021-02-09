import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expands-sm navbar-dark px-sm-5">
          {/* <ul className="navbar-nav mr-auto"> */}
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                products
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/activeOrders" className="nav-link">
                  active orders
              </Link>
            </li>
            <li className="nav-item active"> 
              <Link to="/orders" className="nav-link text-left">
                all orders
              </Link>
            </li>
          {/* </ul> */}
          
      </NavWrapper>
    );
  }  
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
  color:var(--mainWhite) !important;
  font-size:1.3rem;
  text-transform:capitalize;
}
`


 
export default Navbar;