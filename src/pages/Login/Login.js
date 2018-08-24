import React from 'react';
import { Mutation } from 'react-apollo';

import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';

import QUERY from './Query.graphql';
const LOGIN_MUTATION = gql(QUERY);

const styles = {
  login: {},
  loginPanel: {},
  input: {}
};

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
  }

  render() {
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
          //   const { history } = this.props;
        }}
      >
        {login => {
          const state = this.state;

          return (
            <div style={styles.login}>
              <div style={[styles.loginPanel]}>
                <input
                  style={styles.input}
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
                  style={styles.input}
                  type="password"
                  placeholder="Password"
                  onChange={password =>
                    this.setState({ ...state, password: password.target.value })
                  }
                  value={state.password}
                />

                <button
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
                        // Uncomment if you want to see the token in the console
                        // console.log(data);
                        localStorage.setItem('credentials', credentials);
                      }
                    });
                  }}
                >
                  Login
                </button>

                {/* {state.submitting && (
                    <View style={styles.loadIndicator}>
                      <ActivityIndicator size="large" color="#39c2d7" />
                    </View>
                  )} */}
              </div>

              <div style={styles.errorView}>
                {state.error && (
                  <span style={styles.errorText}>{state.error}</span>
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
