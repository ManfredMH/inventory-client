import React from 'react';

const SummaryProduct = ({product, quantity}) => {
    return (
      <React.Fragment>
        <div className="content-products mb-4 p-4">
          <p className="card-text font-weight-bold">
            Product Name
            <span className="font-weight-normal"> {product.name}</span>
          </p>
          <p className="card-text font-weight-bold">
            Quantity
            <span className="font-weight-normal"> {quantity}</span>
          </p>
          <p className="card-text font-weight-bold">
            Price
            <span className="font-weight-normal"> $ {product.price}</span>
          </p>
        </div>
      </React.Fragment>
    );
}

export default SummaryProduct;