import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import arrow_back from './../../assets/images/arrow_back_white.png';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  _navigateToAboutPage = () => {
    this.props.history.push('/about');
  };

  _navigateToLogout = () => {
    this.props.history.push('/logout');
  };

  render() {
    const {
      title,
      subTitle,
      hasBackButton,
      history,
      showLoading,
      showMenu = true,
      showAboutMenuItem = true,
      showLogoutMenuItem = true
    } = this.props;

    return (
      <div className="header container">
        {hasBackButton && (
          <img
            className="backBtn"
            src={arrow_back}
            width="24"
            height="24"
            onClick={history.goBack}
            alt="Go Back"
          />
        )}

        <div className="titleWrapper">
          <div className="title">{title}</div>
          {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>

        {showLoading && <div className="loader" />}

        {showMenu && <div className="menu_btn" onClick={this._toggleMenu} />}

        {this.state.showMenu && (
          <Fragment>
            <div className="overlay" onClick={this._toggleMenu} />
            <div className="menu">
              <ul>
                {showAboutMenuItem && (
                  <li onClick={this._navigateToAboutPage}>About</li>
                )}
                {showLogoutMenuItem && (
                  <li onClick={this._navigateToLogout}>Log out</li>
                )}
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasBackButton: PropTypes.bool,
  showLogoutMenuItem: PropTypes.bool,
  showAboutMenuItem: PropTypes.bool,
  showLoading: PropTypes.bool,
  showMenu: PropTypes.bool,
  history: PropTypes.object
};

export default withRouter(Header);
