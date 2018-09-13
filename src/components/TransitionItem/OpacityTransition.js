import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const OpacityTransitionGroup = ({ children }) => {
  return (
    <CSSTransitionGroup
      transitionName="opacityTransition"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {children}
    </CSSTransitionGroup>
  );
};

export default OpacityTransitionGroup;
