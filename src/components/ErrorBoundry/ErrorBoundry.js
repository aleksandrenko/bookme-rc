import React from 'react';
import { withRouter } from 'react-router-dom';

class ErrorBoundry extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ErrorBoundry);
