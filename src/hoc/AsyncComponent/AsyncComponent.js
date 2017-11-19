import React, { Component } from 'react';

const asynComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent().then((component) => {
        this.setState({ component: component.default });
      })
    }

    render() {
      const Compnent = this.state.component;

      return Compnent ? <Compnent {...this.props} /> : null;
    }
  }
}

export default asynComponent;