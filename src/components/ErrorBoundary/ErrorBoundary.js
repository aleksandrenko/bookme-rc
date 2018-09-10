import React from 'react';
import { withRouter } from 'react-router-dom';
import apolloClient from '../../utils/apolloClient';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    apolloClient.setExternalErrorHandler(err => {
      const history = this.props.history;

      if (err.type === 'ERROR' && err.code === 401)
        if (history.location.pathname !== '/login') {
          history.push({
            pathname: '/login',
            state: { error: err }
          });
        }
    });
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
