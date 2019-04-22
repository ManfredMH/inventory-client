import React from 'react'

const Error = ({ error }) => {
  if (error.message) {
    error = error.message;
  }
  return (<p className="alert alert-danger text-center p-2 my-3">{error}</p>);
}

export default Error;