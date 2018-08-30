import React from 'react';
import './styles.css';

export default props => {
  const { loading, error, networkStatus, children, data } = props;
  const isPooling = networkStatus === 6;

  if (error) {
    console.log(error);
  }

  if (!isPooling) {
    if (loading)
      return (
        <div className="imageBackgroundStyles">
          <div className="centeredContainer">
            <b className="loadingText">Loading data ...</b>
          </div>
        </div>
      );

    if (error && !data) {
      const loginBtn =
        error.message && error.message.search('401') >= 0 ? (
          <button
            onClick={() => {
              // NavigationService.navigate('Login');
              console.log('navigate to login');
            }}
          >
            Login
          </button>
        ) : null;
      return (
        <div className="imageBackgroundStyles">
          <div className="centeredContainer">
            <div>{error.message}</div>
            {loginBtn}
          </div>
        </div>
      );
    }
  }

  return <div className="imageBackgroundStyles">{children}</div>;
};
