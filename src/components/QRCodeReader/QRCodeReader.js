import React from 'react';
import QRCameraButton from './QRCameraButton';
import Header from '../Header/Header';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import styles from './styles.css';

class QRCodeReaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      showCamera: false
    };

    this.handleScan = this.handleScan.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
  }
  handleScan(result) {
    if (result) {
      const roomEmailKey = `/room/${result}`;
      console.log(roomEmailKey);
      this.setState({ showCamera: false });
      this.props.history.push(roomEmailKey);
    }
  }
  handleError(err) {
    console.error(err);
  }
  openImageDialog() {
    this.refs.qrReader.openImageDialog();
  }

  render() {
    const { showCamera } = this.state;

    if (!showCamera) {
      return (
        <QRCameraButton
          onClick={() => {
            this.setState({ showCamera: true });
          }}
        />
      );
    }

    return (
      <div className="qr-code-reader absoluteFill container">
        <Header
          title="QrReader"
          hasBackButton={true}
          skipNavigation={true}
          onBackButtonPress={() => {
            this.setState({ showCamera: false });
          }}
        />
        <QrReader
          ref="qrReader"
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode
          className="scanner"
        />
        <input
          type="button"
          value="Submit QR Code"
          onClick={this.openImageDialog}
        />
      </div>
    );
  }
}

export default withRouter(QRCodeReaderComponent);
