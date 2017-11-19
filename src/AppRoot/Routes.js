import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import ContactData from '../containers/Checkout/ContactData/ContactData';
import Orders from '../containers/Orders/Orders';
import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Auth/Logout/Logout';
import asynComponent from '../hoc/AsyncComponent/AsyncComponent';

const AsyncCheckout = asynComponent(() => {
  return import('../containers/Checkout/Checkout');
});

const AsyncOrders = asynComponent(() => {
  return import('../containers/Orders/Orders');
});

const AsyncAuth= asynComponent(() => {
  return import('../containers/Auth/Auth');
});

class Routes extends Component {
  render() {
    let route = (
      <Switch>
        <Route path='/auth' component={ AsyncAuth } exact />
        <Route path='/' component={ BurgerBuilder } exact />
        <Redirect to='/' />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      return route = (
      <Switch>
        <Route path='/checkout/contact-data' component={ ContactData } exact />
        <Route path='/checkout' component={ AsyncCheckout } />
        <Route path='/orders' component={ AsyncOrders } />
        <Route path='/logout' component={ Logout } exact />
        <Route path='/auth' component={ AsyncAuth } exact />
        <Route path='/' component={ BurgerBuilder } exact />
        <Redirect to='/' />
      </Switch>
      );
    }

    return (
      <span>
        {route}
      </span>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default  connect(mapStateToProps) (Routes);