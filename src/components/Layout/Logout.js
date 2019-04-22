import React from 'react'
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const logoutUser = (client, history) => {
  localStorage.removeItem('token', '');
  client.resetStore();
  history.push('/login');
}

const Logout = ({history}) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
          className="btn btn-light ml-md-2 mt-2 mt-md-0"
          onClick={() => logoutUser(client, history)}>
          Logout</button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Logout);