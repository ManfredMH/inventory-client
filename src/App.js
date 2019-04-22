import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Navbar from './components/Layout/Navbar';
import Clients from './components/Clients/Clients';
import AddClient from './components/Clients/AddClient';
import UpdateClient from './components/Clients/UpdateClient';
import AddProduct from './components/Products/AddProduct';
import Products from './components/Products/Products';
import UpdateProduct from './components/Products/UpdateProduct';
import AddOrder from './components/Orders/AddOrder';
import OrderClient from './components/Orders/OrderClient';
import Panel from './components/Panel/Panel';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Session from './Session';

class App extends Component {
  state = {
    isAuthenticated: false
  }
  componentDidMount() {
    if (this.props.getUser) {
      this.setState({
        isAuthenticated: true
      });
    }
  }
  render() {
    const { refetch, session } = this.props;
    const { getUser } = session;
    const message = (getUser) ? `Welcome: ${getUser.name}` : '';
    return (
      <Router>
        <React.Fragment>
          <Navbar session={session} />
          <div className="container p-4">
           <p className="text-right">{message}</p>
            <Switch>
              <Route exact path="/clients" render={() => <Clients session={session} />} />
              <Route exact path="/clients/add" render={() => <AddClient session={session} />} />
              <Route exact path="/clients/update/:id" component={UpdateClient} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/add" component={AddProduct} />
              <Route exact path="/products/update/:id" component={UpdateProduct} />
              <Route exact path="/orders/:id" component={OrderClient} />
              <Route exact path="/orders/add/:id" render={() => <AddOrder session={session} />} />
              <Route exact path="/panel" component={Panel} />
              <Route exact path="/register" render={() => <Register session={session} />} />
              <Route exact path="/login" render={() => <Login refetch={refetch} />} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

const RootSession = Session(App);

export { RootSession };
