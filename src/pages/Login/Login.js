import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QUERY from './Query.graphql';

import './styles.css';
import LoadIndicator from '../../components/LoadIndicatator/LoadIndicator';
import TransitionItem from '../../components/TransitionItem/TransitionItem';

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
  }

  submitLogin = login => {
    const state = this.state;

    this.setState({
      ...state,
      submitting: true
    });

    const credentials = {
      username: state.username,
      password: state.password
    };

    login({
      variables: credentials
    });
  };

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
        update={(caches, result) => {
          localStorage.setItem('token', result.data.login);
          history.goBack();
        }}
      >
        {login => {
          const state = this.state;
          const errorFromHistoryPush =
            this.props.location.state && this.props.location.state.error;
          const error =
            state.error ||
            (errorFromHistoryPush && errorFromHistoryPush.message);

          return (
            <TransitionItem>
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
                    value={state.password}
                    onChange={password =>
                      this.setState({
                        ...state,
                        password: password.target.value
                      })
                    }
                    onKeyPress={target => {
                      if (target.charCode === 13) {
                        this.submitLogin(login);
                      }
                    }}
                  />
                  <button
                    className="button"
                    title="Login"
                    disabled={
                      this.state.submitting ||
                      (!state.password || !state.username)
                    }
                    onClick={() => this.submitLogin(login)}
                  >
                    Login
                  </button>

                  <LoadIndicator visible={this.state.submitting} />
                </div>

                {error && <div className="errorView">{error}</div>}
              </div>
            </TransitionItem>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Login);
