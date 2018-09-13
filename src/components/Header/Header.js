import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import OpacityTransition from '../TransitionItem/OpacityTransition';

import BackButton from './BackButton';
import Menu from './Menu';

import './styles.css';

class Header extends PureComponent {
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
      showLoading,
      showMenu = true,
      showAboutMenuItem,
      showLogoutMenuItem
    } = this.props;

    return (
      <div className="header container">
        {hasBackButton && <BackButton onClick={this.onBackButtonClick} />}

        <div className="titleWrapper">
          <div className="title">{title}</div>
          {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>

        {showLoading && <div className="loader" />}

        {showMenu && <div className="menu_btn" onClick={this.toggleMenu} />}

        <OpacityTransition>
          {this.state.showMenu && (
            <Menu
              showAboutMenuItem={showAboutMenuItem}
              showLogoutMenuItem={showLogoutMenuItem}
              aboutPageClickHandler={this.navigateToAboutPage}
              logoutClickHandler={this.navigateToLogout}
            />
          )}
        </OpacityTransition>
      </div>
    );
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  navigateToAboutPage = () => {
    this.props.history.push('/about');
  };

  navigateToLogout = () => {
    this.props.history.push('/login', { logout: true });
  };

  onBackButtonClick = () => {
    const { history, onBackButtonPress, skipNavigation } = this.props;
    skipNavigation || history.goBack();
    onBackButtonPress && onBackButtonPress();
  };
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
