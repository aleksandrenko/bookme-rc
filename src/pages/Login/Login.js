import React from 'react';
import { Mutation } from 'react-apollo';

import { withNavigation } from 'react-navigation';
// import NavigationService from 'BookMe/NavigationService';
// import bgSourceImage from '../../../assets/images/bg.png';

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
    this.state = {
      username: '',
      password: '',
      isKeyboardVisible: false,
      submitting: false,
      error: null
    };

    // localStorage.getItem('username').then(username => {
    //   const safeUsername = username || '';
    //   this.setState({ username: safeUsername });
    // });
  }

  //   componentDidMount() {
  //     this.keyboardDidShowListener = Keyboard.addListener(
  //       'keyboardDidShow',
  //       this._keyboardDidShow
  //     );
  //     this.keyboardDidHideListener = Keyboard.addListener(
  //       'keyboardDidHide',
  //       this._keyboardDidHide
  //     );
  //   }

  //   componentWillUnmount() {
  //     this.keyboardDidShowListener.remove();
  //     this.keyboardDidHideListener.remove();
  //   }

  //   _keyboardDidShow = () => {
  //     this.setState({ ...this.state, isKeyboardVisible: true });
  //   };

  //   _keyboardDidHide = () => {
  //     this.setState({ ...this.state, isKeyboardVisible: false });
  //   };

  //   handleOnNavigateBack = () => {
  //     this.props.navigation.state.params.refresh();
  //   };

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
          const { navigation } = this.props;

          //   const {
          //     routeName,
          //     key,
          //     params
          //   } = NavigationService.getPreviousRouteForLogin();

          //   navigation.navigate({
          //     routeName,
          //     key,
          //     params: { ...params, forceRefetch: true }
          //   });
        }}
      >
        {login => {
          const state = this.state;

          return (
            <div style={styles.login}>
              {/* <ImageBackground
                source={bgSourceImage}
                resizeMode="cover"
                style={styles.imageBackgroundStyles}
              > */}
              <div style={[styles.loginPanel]}>
                <input
                  style={styles.input}
                  placeholder="Username@epam.com"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  value={state.username}
                  onChangeText={username => {
                    username && localStorage.setItem('username', username);
                    this.setState({ username: username });
                  }}
                />
                <input
                  style={styles.input}
                  placeholder="Password"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={password =>
                    this.setState({ ...state, password })
                  }
                  value={state.password}
                  secureTextEntry={true}
                />

                <button
                  title="Login"
                  disabled={
                    this.state.submitting ||
                    (!state.password || !state.username)
                  }
                  onClick={() => {
                    //   Keyboard.dismiss();

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
                />

                {/* {state.submitting && (
                    <View style={styles.loadIndicator}>
                      <ActivityIndicator size="large" color="#39c2d7" />
                    </View>
                  )} */}
              </div>

              {/* <View style={styles.errorView}>
                  {state.error && (
                    <Text style={styles.errorText}>{state.error}</Text>
                  )}
                </View> */}

              {/* <View
                  style={[
                    state.isKeyboardVisible ? styles.visibleKeyboard : null
                  ]}
                /> */}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withNavigation(Login);
