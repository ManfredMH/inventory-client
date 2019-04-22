import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../../mutations';
import Error from '../Messages/Error';

const initialState = {
  user: '',
  name: '',
  password: '',
  confirmPassword: '',
  rol: ''
}

class Register extends Component {
 
  state = {
    ...initialState
  }

  clearState = () => {
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
    const { user, password, confirmPassword, name, rol } = this.state;
    const isValid = !user || !password || !name || !rol || password !== confirmPassword;
    return isValid;
  }

  registerUser = (e, createUser) => {
    e.preventDefault();
    createUser().then(() => {
      this.clearState();
      this.props.history.push('/login');
    });
  }

  render() {
    const { user, password, confirmPassword, name, rol } = this.state;
    const rolUser = this.props.session.getUser.rol;
    const redirection = (rolUser !== 'ADMIN') ? <Redirect to='/clients' /> : '';
    return (
      <React.Fragment>
        {redirection}
          <h1 className="text-center mb-5">New User</h1>
          <div className="row  justify-content-center">
            <Mutation mutation={ADD_USER} variables={{ user, name, password, rol }}>
              {(createUser, { loading, error, data }) => {
                return (
                  <form className="col-md-8 card card-body" onSubmit={e => this.registerUser(e, createUser)}>
                    {error && <Error error={error} />}
                    <div className="form-group">
                      <label>User</label>
                      <input
                        type="text"
                        name="user"
                        className="form-control"
                        placeholder="Username"
                        value={user}
                        onChange={this.handleChange}
                      />
                      <small className="form-text text-muted">(Without spaces and special caracterects)</small>
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleChange}
                      />
                      <small className="form-text text-muted">(Compled Name)</small>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Rol</label>
                      <select className="form-control" value={rol} name="rol" onChange={this.handleChange}>
                        <option value="">Choose...</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SELLER">SELLER</option>
                      </select>
                    </div>
                    <button
                      disabled={loading || this.validateForm()}
                      type="submit"
                      className="btn btn-success float-right">
                      Create User
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

export default withRouter(Register);