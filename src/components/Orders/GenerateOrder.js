import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_ORDER } from '../../mutations';

const validateOrder = (props) => {
  let isValid = !props.products || props.total <= 0;
  return isValid;
}

const GenerateOrder = (props) => {
  return (
    <Mutation mutation={ADD_ORDER} onCompleted={() => props.history.push('/clients')}>
      {addOrder => (
        <button
          disabled={validateOrder(props)}
          type="button"
          className="btn btn-warning mt-4"
          onClick={e => {
            const productsInput = props.products.map(({ name, price, stock, ...product }) => product);
            const input = {
              order: productsInput,
              total: props.total,
              client: props.idClient,
              seller: props.idSeller
            }
            addOrder({ variables: { input } });
          }}>
          Generate Order
        </button>
      )}
    </Mutation>
  );
}

export default withRouter(GenerateOrder);