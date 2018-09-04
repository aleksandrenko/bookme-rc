import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class LoadIndicator extends Component {
  render() {
    const loaderClassNames = `loadIndicator ${
      this.props.visible ? 'visible' : ''
    }`;

    return (
      <div className={loaderClassNames}>
        <div className="loadIndicationsWrapper">
          <div className="lds-dual-ring" />
          <div className="loadingText">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

LoadIndicator.propTypes = {
  visible: PropTypes.bool,
  text: PropTypes.string
};

export default LoadIndicator;
