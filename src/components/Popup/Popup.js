import React, { Fragment } from 'react';

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
            {children.booking.map(item => {
              return (
                <div className="slot" key={item}>
                  {item}
                </div>
              );
            })}
          </Fragment>
        )}
        {children.unbooking.length && (
          <Fragment>
            <h4>Unbook slots:</h4>
            {children.unbooking.map(item => {
              return (
                <div className="slot" key={item}>
                  {item}
                </div>
              );
            })}
          </Fragment>
        )}
        <div className="actionButtons">
          <button
            className="submitButton"
            title="Submit"
            onClick={() => this.setState({ modalOpen: true })}
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

export default Popup;
