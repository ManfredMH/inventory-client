import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_PRODUCT } from '../../mutations';

const initialState = {
  name: '',
  price: '',
  stock: ''
}

class FormUpdateProduct extends Component {
  
  state = {
    ...this.props.product.getProduct
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

  handleSubmit = (e, updateProduct) => {
    e.preventDefault();
    updateProduct().then(() => {
      this.cleanState();
    });
  }

  render() {
    const { name, price, stock } = this.state;
    const { id } = this.props;
    const input = {
      id,
      name,
      price: Number(price),
      stock: Number(stock)
    }
    return (
      <Mutation mutation={UPDATE_PRODUCT} variables={{ input }} key={id}
        onCompleted={() => this.props.refetch().then(() => {this.props.history.push('/products')})}>
        {(updateProduct, { loading, error, data }) => {
          return (
            <form
              className="col-md-8 card card-body" onSubmit={e => this.handleSubmit(e, updateProduct)}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Product Name"
                  defaultValue={name}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Product Price"
                    defaultValue={price}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input
                  onChange={this.handleChange}
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="Product Stock"
                  defaultValue={stock}
                />
              </div>
              <button
                disabled={this.validateForm()}
                type="submit"
                className="btn btn-success">
                Save Changes
            </button>
            </form>
          );
        }}
      </Mutation>
    );
    }
}

export default withRouter(FormUpdateProduct);