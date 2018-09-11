import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Popup extends React.Component {
  render() {
    const { onClose, children } = this.props;

    return (
      <div className="popup">
        <h1>Confirm updates</h1>
        {children.booking.length && (
          <Fragment>
            <h4>Book slots:</h4>
            <ul>
              {children.booking.map(item => {
                return (
                  <li className="slot" key={item.startTime}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </Fragment>
        )}
        {children.unbooking.length && (
          <Fragment>
            <h4>Unbook slots:</h4>
            <ul>
              {children.unbooking.map(item => {
                return (
                  <li className="slot" key={item}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </Fragment>
        )}
        <div className="actionButtons">
          <button
            className="submitButton"
            title="Submit"
            onClick={() => console.log('sendData')}
          >
            Confirm
          </button>
          <button
            className="cancelButton"
            title="Cancel"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

export default Popup;
