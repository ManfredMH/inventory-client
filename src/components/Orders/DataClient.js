import React from 'react';
import { Query } from 'react-apollo';
import { CLIENT_QUERY } from '../../queries';

const DataClient = ({id}) => {
  return (
    <React.Fragment>
      <h2 className="text-center">Client Data</h2>
      <Query query={CLIENT_QUERY} variables={{id}} pollInterval={500}>
        {({ loading, err, data, startPolling, stopPolling }) => {
          if (loading) return 'Loading...';
          if (err) return `Error ${err.message}`;
          const { name, lastname, company, age, emails, type } = data.getClient;
          return (
            <ul className="list-unstyled card">
              <li className="border font-weight-bold p-2">
                Name: <span className="font-weight-normal">{name}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Lastname: <span className="font-weight-normal">{lastname}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Age: <span className="font-weight-normal">{age}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Company: <span className="font-weight-normal">{company}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Email: <span className="font-weight-normal"> {emails.map(email => ` -${email.email}`)}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Type: <span className="font-weight-normal">{type}</span>
              </li>
            </ul>
          )
    }}
      </Query>
    </React.Fragment>
  );
}

export default DataClient;