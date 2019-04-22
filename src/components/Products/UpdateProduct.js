import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PRODUCT_QUERY } from '../../queries';
import FormUpdateProduct from './FormUpdateProduct';

export default class UpdateProduct extends Component {

  render() {
    const { id } = this.props.match.params;
        return (
          <React.Fragment>
            <h1 className="text-center">Update Product</h1>
            <div className="row justify-content-center">
              <Query query={PRODUCT_QUERY} variables={{id}}>
                {({ loading, err, data, refetch }) => {
                  if (loading) return 'Loading...';
                  if (err) return `Error ${err.message}`;
                  return (<FormUpdateProduct product={data} id={id} refetch={refetch}/>);
                }}
              </Query>
            </div>
          </React.Fragment>
        );
    }
}