import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../queries';
import { DELETE_PRODUCT } from '../../mutations';
import Success from '../Messages/Success';
import Pager from '../Pager';

export default class Products extends Component {
  
  limit = 10;

  state = {
    pager: {
      current: 1,
      offset: 0
    },
    alert: {
      show: false,
      message: ''
    }
  }

  previousPage = () => {
    this.setState({
      pager: {
        offset: this.state.pager.offset - this.limit,
        current: this.state.pager.current - 1
      }
    });
  }

  nextPage = () => {
    this.setState({
      pager: {
        offset: this.state.pager.offset + this.limit,
        current: this.state.pager.current + 1
      }
    });
  }

  render() {
    const { alert: { show, message } } = this.state;
    const alert = (show) ? <Success message={message} /> : '';
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Products</h1>
        {alert}
        <Query query={PRODUCTS_QUERY} pollInterval={1000} variables={{limit: this.limit, offset: this.state.pager.offset}}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return "Loading...";
            if (error) return `Error: ${error.message}`;
            return (
              <React.Fragment>
                <table className="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProducts.map(product => {
                      const { id, stock } = product;
                      let style;
                      if (stock < 50) {
                        style = 'text-light table-danger';
                      } else if(stock > 51 && stock < 100) {
                        style = 'text-light table-warning';
                      }
                      return (
                      <tr key={id} className={style}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <Link to={`/products/update/${id}`} className="btn btn-success">Update</Link>
                        </td>
                        <td>
                          <Mutation mutation={DELETE_PRODUCT} onCompleted={(data) => {
                            this.setState({
                              alert: {
                                show: true,
                                message: data.deleteProduct
                              }
                            }, () => {
                              setTimeout(() => {
                                this.setState({ alert: { show: false, message: '' } });
                              }, 3000)
                            });
                          }}>
                            {deleteProduct => (
                              <button className="btn btn-danger" onClick={() => {
                                if (window.confirm('You want to deleted this product?')) {
                                  deleteProduct({ variables: { id } })
                                }
                              }}>&times;</button>
                            )}
                          </Mutation>
                        </td>
                      </tr>);
                    })}
                  </tbody>
                </table>
                <Pager current={this.state.pager.current}
                  total={data.totalProducts}
                  limit={this.limit}
                  previousPage={this.previousPage}
                  nextPage={this.nextPage}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
