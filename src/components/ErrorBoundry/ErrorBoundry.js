import React from 'react';
import { withRouter } from 'react-router-dom';
import apolloClient from '../../utils/apolloClient';

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    apolloClient.setExternalErrorHandler(err => {
      if (err.type === 'ERROR' && err.code === 401)
        this.props.history.push({
          pathname: '/login',
          state: { error: err }
        });
    });
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ErrorBoundry);
