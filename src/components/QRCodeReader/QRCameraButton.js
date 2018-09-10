import React from 'react';
import PropTypes from 'prop-types';
import qrCodeScanImage from '../../assets/images/qr.png';
import './styles.css';

class QRCameraButton extends React.Component {
  render() {
    return (
      <div className="qr-code-button container">
        <img
          src={qrCodeScanImage}
          className="image"
          alt="Scan"
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

QRCameraButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default QRCameraButton;
