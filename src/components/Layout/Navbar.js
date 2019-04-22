import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RegisterButton from './RegisterButton';

const Navbar = ({ session }) => {
  let nav = (session.getUser) ? <NavbarAutheticated session={session} /> : <NavbarNoAutheticated />;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
      <div className="container">
        {nav}
      </div>
    </nav>
  );
};

const NavbarNoAutheticated = () => (
  <div>
    <Link to="/login" className="navbar-brand text-light font-weight-bold" >Go to Login</Link>
  </div>
);

const NavbarAutheticated = (session) => (
  <React.Fragment>
    <Link to="/panel" className="navbar-brand text-light font-weight-bold" >CRM</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegation" aria-controls="navegation" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navegation">
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0 mt-2 mt-md-0">
          <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">Clients</button>
          <div className="dropdown-menu" aria-labelledby="navegation">
            <Link to="/clients" className="dropdown-item">Go to Clients</Link>
            <Link to="/clients/add" className="dropdown-item">Add Client</Link>
          </div>
        </li>
        <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">Products</button>
          <div className="dropdown-menu" aria-labelledby="navegation">
            <Link to="/products" className="dropdown-item">Go to Products</Link>
            <Link to="/products/add" className="dropdown-item">Add Product</Link>
          </div>
        </li>
        <RegisterButton session={session}/>
        <Logout />
      </ul>
    </div>
  </React.Fragment>
);

export default Navbar;