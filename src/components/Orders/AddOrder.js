import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../queries';
import DataClient from './DataClient';
import OrderContent from './OrderContent';
import './css/Spinner.css';

class AddOrder extends Component {

  render() {
    const { id } = this.props.match.params;
    const idSeller = this.props.session.getUser.id;
        return (
          <React.Fragment>
            <div className="row">
              <div className="col-md-3">
                <DataClient id={id} />
              </div>
              <div className="col-md-9">
                <Query query={PRODUCTS_QUERY} variables={{stock: true}}>
                  {({ loading, err, data }) => {
                    if (loading) return (<div className="spinner">
                      <div className="dot1"></div>
                      <div className="dot2"></div>
                    </div>);
                    if (err) return `Error ${err.message}`;
                    return (
                      <OrderContent products={data.getProducts} id={id} idSeller={idSeller} />
                    )
                  }}
                </Query>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

export default withRouter(AddOrder);