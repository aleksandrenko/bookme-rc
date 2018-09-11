import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import arrow_back from './../../assets/images/arrow_back_white.png';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

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
    this.props.history.push('/login', { logout: true });
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
      showLogoutMenuItem = true,
      onBackButtonPress,
      skipNavigation
    } = this.props;

    return (
      <div className="header container">
        {hasBackButton && (
          <img
            className="backBtn"
            src={arrow_back}
            width="24"
            height="24"
            onClick={() => {
              skipNavigation || history.goBack();
              onBackButtonPress && onBackButtonPress();
            }}
            alt="Go Back"
          />
        )}

        <div className="titleWrapper">
          <div className="title">{title}</div>
          {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>

        {showLoading && <div className="loader" />}

        {showMenu && <div className="menu_btn" onClick={this._toggleMenu} />}

        <CSSTransitionGroup
          transitionName="menuTransition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.showMenu && (
            <div>
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
            </div>
          )}
        </CSSTransitionGroup>
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
  history: PropTypes.object,
  onBackButtonPress: PropTypes.func,
  skipNavigation: PropTypes.bool
};

export default withRouter(Header);
