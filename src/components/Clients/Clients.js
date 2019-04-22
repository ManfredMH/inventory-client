import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { CLIENTS_QUERY } from '../../queries';
import { DELETE_CLIENT } from '../../mutations';
import Pager from '../Pager';
import Success from '../Messages/Success';

class Clients extends Component {

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
      }});
  }

  render() {
    const { alert: { show, message } } = this.state;
    const alert = (show) ? <Success message={message} /> : '';
    let id;
    const { rol } = this.props.session.getUser;
    if (rol === 'SELLER') {
      id = this.props.session.getUser.id;
    } else {
      id = '';
    }
    return (
      <React.Fragment>
        <h1 className="text-center">Clients</h1>
        {alert}
        <Query query={CLIENTS_QUERY} pollInterval={1000} variables={{ limit: this.limit, offset: this.state.pager.offset, seller: id }}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return "Loading...";
            if (error) return `Error: ${error.message}`;
            return (
              <React.Fragment>
                <ul className="list-group mt-3">
                  {data.getClients.map(client => {
                    const { id } = client;
                    return (
                      <li key={client.id} className="list-group-item">
                        <div className="row justify-content-between alig-items-center">
                          <div className="col-md-4 d-flex justify-content-between alig-items-center">
                            {client.name} {client.lastname} - {client.company}
                          </div>
                          <div className="col-md-4 d-flex justify-content-end">
                            <Link to={`/orders/add/${id}`} className="btn btn-warning d-block d-md-inline-block mr-2">New Order</Link>
                            <Link to={`/orders/${id}`} className="btn btn-primary d-block d-md-inline-block mr-2">Orders</Link>
                            <Link to={`/clients/update/${id}`} className="btn btn-success d-block d-md-inline-block">
                              Update
                            </Link>
                            <Mutation mutation={DELETE_CLIENT} onCompleted={(data) => {
                              this.setState({
                                alert: {
                                  show: true,
                                  message: data.deleteClient
                                }
                              }, () => {
                                setTimeout(() => {
                                  this.setState({ alert: { show: false, message: '' } });
                                }, 3000)
                              });
                            }}>
                              {deleteClient => (
                                <button type="button" className="btn btn-danger d-block d-md-inline-block ml-2" onClick={() => {
                                  if (window.confirm('You want to deteled this client?')) {
                                    deleteClient({ variables: { id } })
                                  }
                                }}>&times;</button>
                              )}
                            </Mutation>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Pager current={this.state.pager.current}
                  total={data.totalClients}
                  limit={this.limit}
                  previousPage={this.previousPage}
                  nextPage={this.nextPage}
                />
              </React.Fragment>
            )
          }}
        </Query>
      </React.Fragment>);
  }
}
    
export default Clients;
    
    
