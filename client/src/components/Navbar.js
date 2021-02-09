import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ButtonContainer} from '../styled/Button'
import styled from 'styled-components';
//import logo from 'C:/Users/Monika/Desktop/Nowy folder/client/src/book.svg'

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expands-sm navbar-dark px-sm-5">
          {/* <Link to='/'>
            <img src={logo} alt="store" className="navbar-brand"/>
          </Link> */}
          <ul className="navbar-nav align-items-contener">
            <li className="nav-item ml-5S">
              <Link to="/" className="nav-link">
                products
              </Link>
            </li>
          </ul>
          <Link to="/cart" className="ml-auto">
            <ButtonContainer>my cart</ButtonContainer>
          </Link>
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