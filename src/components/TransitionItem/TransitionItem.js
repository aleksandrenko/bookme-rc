import React, { Component } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

class TransitionItem extends Component {
  render() {
    return <Item className="transition-item">{this.props.children}</Item>;
  }
}

export default TransitionItem;
