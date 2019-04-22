import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NEW_CLIENT } from '../../mutations';
import { Mutation } from 'react-apollo';

class AddClient extends Component {

  state = {
    client: {
      name: '',
      lastname: '',
      company: '',
      age: '',
      type: ''
    },
    error: false, 
    emails: []
  }

  handleChange = (e) => {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.name]: e.target.value
      }});
  }

  newEmailInput = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: '' }])
    });
  }

  handleEmailChange = (e, index)=> {
    const newEmail = this.state.emails.map((email, i) => {
      if (index !== i) return email;
      return {
        ...email,
        email: e.target.value
      };
    });
    this.setState({
      emails: newEmail
    });
  }

  deleteEmailInput = (index) => {
    this.setState({
      emails: this.state.emails.filter((email, i) => index !== i)
    });
  }

  handleSubmit(e, createClient){
    e.preventDefault();
    const idSeller = this.props.session.getUser.id;
    const { name, lastname, company, age, type } = this.state.client;
    const { emails } = this.state;

    if (name === '' || lastname === '' || company === '' || age === '' || type === '') {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    const input = {
      name,
      lastname,
      company,
      age: Number(age),
      emails,
      type,
      seller: idSeller
    };

    createClient({ variables: { input } });
  }

  render() {
    const { error } = this.state;
    let message = (error) ? <p className="alert alert-danger p-3 text-center">All fill's are requiered</p> : '';
      return (
        <React.Fragment>
          <h2 className="text-center">Add Client</h2>
          {message}
          <div className="row justity-content-center">
            <Mutation mutation={NEW_CLIENT} onCompleted={() => this.props.history.push('/clients')}>
              {createClient => (
                <form className="col-md-8 m-auto card card-body" onSubmit={ e => this.handleSubmit(e, createClient)}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Name</label>
                      <input type="text" name="name" className="form-control" placeholder="Name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Lastname</label>
                      <input type="text" name="lastname" className="form-control" placeholder="Lastname" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Company</label>
                      <input type="text" name="company" className="form-control" placeholder="Company" onChange={this.handleChange} />
                    </div>
                    {this.state.emails.map((input, index) => (
                      <div key={index} className="form-group col-md-12">
                        <label>Email: {index + 1}</label>
                        <div className="input-group">
                          <input type="email" placeholder="Email" className="form-control" onChange={e => this.handleEmailChange(e, index)} />
                          <div className="input-group-append">
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteEmailInput(index)}>&times; Delete </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="form-group d-flex justify-content-center col-md-12">
                      <button type="button" className="btn btn-warning" onClick={this.newEmailInput}>+ Add Email</button>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Age</label>
                      <input type="number" name="age" className="form-control" placeholder="Age" onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Type Client</label>
                      <select className="form-control" name="type" onChange={this.handleChange}>
                        <option value="">Choose...</option>
                        <option value="PREMIUM">PREMIUM</option>
                        <option value="BASIC">BASIC</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success float-right">Add Client</button>
                </form>
              )}
            </Mutation>
          </div>
        </React.Fragment>
        );
    }
}

export default withRouter(AddClient);