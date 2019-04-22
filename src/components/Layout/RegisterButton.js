import React from 'react'
import { Link } from 'react-router-dom';

const RegisterButton = ({ session }) => {
  const { rol } = session.session.getUser;
  if (rol !== 'ADMIN') return null;
  return <Link to="/register" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
    Create Users
  </Link>;
}

export default RegisterButton;