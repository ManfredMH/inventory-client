import React, { Component } from 'react';
import { UPDATE_CLIENT } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormUpdate extends Component {

  state = {
    client: this.props.client,
    emails: this.props.client.emails
  }

  handleChange = (e) => {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.name]: e.target.value
      }
    });
  }

  hanldeNewEmail = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: '' }])
    });
  }

  handleEmailInput = i => e => {
    const newEmail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return { ...email, email: e.target.value };
    });
    this.setState({ emails: newEmail });
  }

  handleDeleteEmail = i => () => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  }

  handleSubmit = (e, updateClient) => {
    e.preventDefault();
    const { id, name, lastname, company, age, type } = this.state.client;
    const { emails } = this.state;
    const input = {
      id,
      name,
      lastname,
      company,
      age: Number(age),
      type,
      emails
    };
    updateClient({variables: {input}});
  }

  render() {
    const { emails } = this.state;
    const { name, lastname, company, age, type } = this.state.client;
    return (
      <Mutation mutation={UPDATE_CLIENT} onCompleted={() => this.props.refetch().then(() => this.props.history.push('/clients'))}>
        {updateClient => (
      <form className="col-md-8 m-3 card card-body" onSubmit={e => this.handleSubmit(e, updateClient)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              defaultValue={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              defaultValue={lastname}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label>Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              defaultValue={company}
              onChange={this.handleChange}
            />
          </div>
          {emails.map((input, index) => (
            <div key={index} className="form-group col-md-12">
              <label>Email {index + 1} : </label>
              <div className="input-group">
                <input
                  type="email"
                  placeholder={`Email`}
                  className="form-control"
                  onChange={this.handleEmailInput(index)}
                  defaultValue={input.email}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.handleDeleteEmail(index)}>
                    &times; Delete </button>
                </div>
              </div>
            </div>
          ))}
          <div className="form-group d-flex justify-content-center col-md-12">
            <button
              onClick={this.hanldeNewEmail}
              type="button"
              className="btn btn-warning"
            >+ Add Email</button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              defaultValue={age}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Type Client</label>
            <select className="form-control" name="type" defaultValue={type} onChange={this.handleChange}>
              <option value="">Choose...</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="BASIC">BASIC</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success float-right">Save Changes</button>
          </form>
        )}
      </Mutation>
    );
  }
}


export default withRouter(FormUpdate);