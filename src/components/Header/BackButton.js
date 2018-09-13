import React from 'react';
import PropTypes from 'prop-types';
import arrow_back from './../../assets/images/arrow_back_white.png';

const BackButton = ({ onClick }) => {
  return (
    <img
      className="backBtn"
      src={arrow_back}
      width="24"
      height="24"
      onClick={onClick}
      alt="Go Back"
    />
  );
};

BackButton.props = {
  onClick: PropTypes.func
};

export default BackButton;
