import React from 'react';
import PropTypes from 'prop-types';

const Menu = props => {
  const {
    showAboutMenuItem = true,
    showLogoutMenuItem = true,
    aboutPageClickHandler,
    logoutClickHandler
  } = props;

  return (
    <div>
      <div className="overlay" onClick={this.toggleMenu} />
      <div className="menu">
        <ul>
          {showAboutMenuItem && <li onClick={aboutPageClickHandler}>About</li>}
          {showLogoutMenuItem && <li onClick={logoutClickHandler}>Logout</li>}
        </ul>
      </div>
    </div>
  );
};

Menu.props = {
  showAboutMenuItem: PropTypes.bool,
  showLogoutMenuItem: PropTypes.bool,
  aboutPageClickHandler: PropTypes.func,
  logoutClickHandler: PropTypes.func
};

export default Menu;
