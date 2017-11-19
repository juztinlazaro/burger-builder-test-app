import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layout from '../hoc/Layout';
import Routes from './Routes';
import { authCheckState } from '../store/actions';

class App extends Component {
	componentDidMount() {
		this.props.authCheckState();
	}

  render() {
    return (
      <div>
        <Layout>
          <Routes {...this.props} />
        </Layout>
      </div>
    );
  }
}

export default withRouter( connect(null, { authCheckState }) (App) );
