import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { UPDATE_STATUS } from '../../mutations';
import { PRODUCT_QUERY } from '../../queries';
import SummaryProduct from './SummaryProduct';

import './css/Orders.css';

const Order = (props) => {
  const { order } = props;
  const date = new Date(Number(order.date));
  const { status } = order;
  let style;
  if (status === 'PENDING') {
    style = 'border-light';
  } else if (status === 'CANCELED') {
    style = 'border-danger';
  } else {
    style = 'border-success';
  }

  return (
    <div className="col-md-4">
      <div className={`card mb-3 ${style}`} >
        <div className="card-body">
          <p className="card-text font-weight-bold ">Status:
              <Mutation mutation={UPDATE_STATUS}>
              {updateStatus => (
              <select className="form-control my-3" value={order.status} onChange={e => {
                const input = {
                  id: order.id,
                  order: order.order,
                  date: order.date,
                  total: order.total,
                  client: props.client,
                  status: e.target.value
                }
                  updateStatus({ variables: { input } });
              }}>
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELED">CANCELED</option>
                </select>
              )}
              </Mutation>
          </p>
          <p className="card-text font-weight-bold">Order ID:
            <span className="font-weight-normal"> {order.id}</span>
          </p>
          <p className="card-text font-weight-bold">Date:
            <span className="font-weight-normal"> {date.toDateString('en-US')}</span>
          </p>
          <h3 className="card-text text-center mb-3 resalt-text ">Order Articules</h3>
          {order.order.map((product, index) => {
            const { id, quantity } = product;
            return (
              <Query key={order.id+index} query={PRODUCT_QUERY} variables={{ id }}>
                {({ loading, err, data }) => {
                  if (loading) return 'Loading...';
                  if (err) return `Error ${err.message}`;
                  return (
                    <SummaryProduct product={data.getProduct} quantity={quantity} key={id+index} />
                  )
                }}
              </Query>
            );
          })}
          <div className="d-flex align-items-center justify-content-end">
            <p className="card-text resalt-text mr-1 bg-warning">Total:</p>
            <p className="font-weight-normal inc-text"> $ {order.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;