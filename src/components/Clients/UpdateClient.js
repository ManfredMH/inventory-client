import React, { Component } from 'react';
import { CLIENT_QUERY } from '../../queries';
import { Query } from 'react-apollo';

import FormUpdate from './FormUpdateClient';

export default class UpdateClient extends Component {

  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h2 className="text-center">Update Client</h2>
        <div className="row justify-content-center">
          <Query query={CLIENT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return 'Loading...';
              if (error) return `Error ${error.message}`;
              return <FormUpdate client={data.getClient} refetch={refetch}/>
            }}
          </Query>
        </div>
      </React.Fragment>
    );
    }
}