import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../mutations';
import Error from '../Messages/Error';

const initialState = {
  user: '',
  password: ''
}

class Login extends Component {
  
  state = {
    ...initialState
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  clearState = () => {
    this.setState({ ...initialState });
  }

  login = (e, authenticatedUser) => {
    e.preventDefault();
    authenticatedUser().then(async ({ data }) => {
      localStorage.setItem('token', data.authenticatedUser.token);
      await this.props.refetch();
      this.clearState();
      setTimeout(() => {
        this.props.history.push('/panel');
      }, 1000);
    });
  }

  validateForm = () => {
    const { user, password } = this.state;
    const noValid = !user || !password;
    return noValid;
  }

  render() {
    const { user, password } = this.state;
    return (
      <Fragment>
        <h1 className="text-center mb-5">Login</h1>
        <div className="row  justify-content-center">
          <Mutation
            mutation={LOGIN_USER}
            variables={{ user, password }}
          >
            {(authenticatedUser, { loading, error, data }) => {
              return (
                <form
                  onSubmit={e => this.login(e, authenticatedUser)}
                  className="col-md-8 card card-body"
                >
                  {error && <Error error={error} />}
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      onChange={this.handleChange}
                      value={user}
                      type="text"
                      name="user"
                      className="form-control"
                      placeholder="User Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      onChange={this.handleChange}
                      value={password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <button
                    disabled={
                      loading || this.validateForm()
                    }
                    type="submit"
                    className="btn btn-success">
                    Login
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Login);