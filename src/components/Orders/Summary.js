import React from 'react'
import Product from './Product';

const Summary = (props) => {

  const products = props.products;
  if (products.length === 0) return null;
  return (
    <React.Fragment>
      <h2 className="text-center my-5">Product Summary</h2>
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight-bold">
            <th>Product</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product
              key={product.id}
              id={product.id}
              product={product}
              index={index}
              handleQuantity={props.handleQuantity}
              deleteProduct={props.deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Summary;