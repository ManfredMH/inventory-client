import React from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER } from './queries';

const Session = Component => props => (
    <Query query={CURRENT_USER}>
      {({ loading, error, data, refetch }) => {
      if (loading) return null;
        return <Component {...props} refetch={refetch} session={data} />
      }}
    </Query>
);

export default Session;