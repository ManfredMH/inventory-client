import React from 'react';
import { Query } from 'react-apollo';
import { ORDERS_QUERY } from '../../queries';
import './css/Spinner.css';
import Order from './Order';

const OrderClient = (props) => {
  const client = props.match.params.id;
  
  return (
    <React.Fragment>
      <h1 className="text-center mb-2">Orders Client</h1>
      <div className="row">
        <Query query={ORDERS_QUERY} variables={{client}} pollInterval={500}>
          {({ loading, err, data, startPolling, stopPolling }) => {
            if (loading) return (<div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>);
            if (err) return `Error ${err.message}`;
            return (
              data.getOrders.map(order => (
                <Order
                  key={order.id}
                  order={order}
                  client={client}
                />
              ))
            );
        }}
        </Query>
      </div>
    </React.Fragment>
  );
}

export default OrderClient;