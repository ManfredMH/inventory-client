import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PRODUCT } from '../../mutations';

const initialState = {
  name: '',
  price: '',
  stock: ''
}

export default class AddProduct extends Component {

  state = {
    ...initialState
  }

  cleanState = () => {
    this.setState({
      ...initialState
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateForm = () => {
    const { name, price, stock } = this.state;
    const noValid = !name || !price || !stock;
    return noValid;
  }

  handleSubmit = (e, addProduct) => {
    e.preventDefault();
    addProduct().then(() => {
      this.cleanState();
      this.props.history.push('/products');
    });
  }

  render() {
    const { name, price, stock } = this.state;
    const input = {
      name,
      price: Number(price),
      stock: Number(stock)
    }
    return (
      <React.Fragment>
        <h1 className="text-center">Add Product</h1>
        <div className="row justify-content-center">
          <Mutation mutation={ADD_PRODUCT} variables={{input}}>
            {(addProduct, { loading, error, data }) => {
              return (
                <form className="col-md-8 card card-body m-auto" onSubmit={e => this.handleSubmit(e, addProduct)}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Product Name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                      </div>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Product Price"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      placeholder="Product Stock"
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    disabled={this.validateForm()}
                    type="submit"
                    className="btn btn-success">
                    Add Product
              </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </React.Fragment>
    );
    }
}