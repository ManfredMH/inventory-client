import React, { Component } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Summary from './Summary';
import GenerateOrder from './GenerateOrder';
import Error from '../Messages/Error';

export default class OrderContent extends Component {

  state = {
    products: [],
    total: 0
  }

  handleChange = (products) => {
    this.setState({ products });
  }

  handleTotal = () => {
    const products = this.state.products;
    if (products.length === 0) {
      this.setState({ total: 0 });
      return;
    } 
    let newTotal = 0;
    products.map(product => newTotal += (product.quantity * product.price));
    this.setState({ total: newTotal });
  }

  handleQuantity = (quantity, index) => {
    const products = this.state.products;
    products[index].quantity = Number(quantity);
    this.setState({ products }, () => {
      this.handleTotal();
    });
  }

  deleteProduct = (id) => {
    const products = this.state.products;
    const productsRes = products.filter(product => product.id !== id);
    this.setState({ products: productsRes }, () => {
      this.handleTotal();
    });
  }

  render() {
    const message = (this.state.total < 0) ? <Error error="The quantities cannot be negatives" /> : '';
        return (
          <React.Fragment>
            <h2 className="text-center">Select Articles</h2>
            {message}
            <Select
              options={this.props.products}
              isMulti={true}
              components={Animated()}
              placeholder={'Select Products...'}
              getOptionValue={(options) => options.id}
              getOptionLabel={(options) => options.name}
              onChange={this.handleChange}
              value={this.state.products}
            />
            <Summary products={this.state.products}
              handleQuantity={this.handleQuantity}
              deleteProduct={this.deleteProduct}
            />
            <p className="font-weight-bold float-right mt-3">
              Total: <span className="font-weight-normal">{this.state.total}</span>
            </p>
            <GenerateOrder
              products={this.state.products}
              total={this.state.total}
              idClient={this.props.id}
              idSeller={this.props.idSeller}
            />
          </React.Fragment>
        );
    }
}