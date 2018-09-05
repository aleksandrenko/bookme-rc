import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QUERY from './Query.graphql';

import './styles.css';

const LOGIN_MUTATION = gql(QUERY);

class Login extends React.Component {
  constructor() {
    super();
    const username = localStorage.getItem('username');
    const safeUsername = username || '';
    this.state = {
      username: safeUsername,
      password: '',
      isKeyboardVisible: false,
      submitting: false,
      error: null
    };

    //for browser with autofill component need to rerender to enable the submit button
    setTimeout(() => {
      this.forceUpdate();
    }, 10);
  }

  render() {
    const { history } = this.props;

    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        onError={error => {
          this.setState({
            ...this.state,
            submitting: false,
            error: error.message || 'Unknown error'
          });
        }}
        onCompleted={() => {
          this.setState({
            ...this.state,
            submitting: false,
            error: null
          });
        }}
        update={(caches, { data: { login } }) => {
          localStorage.setItem('token', login);
          history.goBack();
        }}
      >
        {login => {
          const state = this.state;

          return (
            <div className="login">
              <div className="loginPanel">
                <input
                  className="input"
                  placeholder="Username@epam.com"
                  value={state.username}
                  onChange={username => {
                    username &&
                      localStorage.setItem('username', username.target.value);

                    this.setState({
                      ...state,
                      username: username.target.value
                    });
                  }}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={password =>
                    this.setState({ ...state, password: password.target.value })
                  }
                  value={state.password}
                />

                <button
                  className="button"
                  title="Login"
                  disabled={
                    this.state.submitting ||
                    (!state.password || !state.username)
                  }
                  onClick={() => {
                    this.setState({
                      ...state,
                      submitting: true
                    });

                    const credentials = {
                      username: state.username,
                      password: state.password
                    };

                    login({
                      variables: credentials,
                      updateQuery: data => {
                        localStorage.setItem('credentials', credentials);
                      }
                    });
                  }}
                >
                  Login
                </button>
              </div>

              <div className="errorView">
                {this.props.location.state &&
                  this.props.location.state.error && (
                    <div className="errorText">
                      <h4>ERROR {this.props.location.state.error.code}</h4>
                      <div>
                        reason: {this.props.location.state.error.message}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Login);
