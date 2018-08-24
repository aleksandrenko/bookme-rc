import React from 'react';
import { withRouter } from 'react-router-dom';

class About extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(About);
