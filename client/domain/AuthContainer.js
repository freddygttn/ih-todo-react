import React from "react";
import PropTypes from "prop-types";

import Api from "../data/AuthApi";
import Page from "../ui/Page";
import Login from "../ui/auth/Login";
import SignUp from "../ui/auth/SignUp";
import NotFound from "../ui/NotFound";

// Views handled by this container
const AuthStatus = {
    "Login": "AUTH_STATUS/LOGIN",
    "SignUp": "AUTH_STATUS/SIGN_UP"
}

/**
 * Container that encapsulates authentication logic.
 */
class AuthContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            status: AuthStatus.Login,
            isRequesting: false,
            error: null,
        };

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    // Update the status
    setAuthStatus(status) {
        this.setState((state) => ({ ...state, status, error: null }));
    }

    // Login the user given a username and a password
    login(username, password) {
        this.setState((state) => ({ ...state, isRequesting: true }));
        Api.login(username, password)
            .then((response) => {
                if (response.data && response.data.message) {
                    this.setState((state) => ({ ...state, error: response.data.message, isRequesting: false }));
                }
                else {
                    this.props.onUserLoggedIn(response.data);
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error: "Caught unchecked error: " + JSON.stringify(error), isRequesting: false }));
            });
    }

    // Sign up a user given a username and a password, with a password confirmation
    signUp(username, password, repeatPassword) {
        if (password !== repeatPassword) {
            this.setState((state) => ({ ...state, error: "Passwords do not match" }));
            return;
        }

        this.setState((state) => ({ ...state, isRequesting: true }));
        Api.signUp(username, password)
            .then((response) => {
                if (response.data && response.data.message) {
                    this.setState((state) => ({ ...state, error: response.data.message, isRequesting: false }));
                }
                else {
                    this.props.onUserLoggedIn(response.data);
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error: "Caught unchecked error: " + JSON.stringify(error), isRequesting: false }));
            });
    }

    render() {
        switch (this.state.status) {
            case AuthStatus.Login:
                return <Page title="Log In">
                    <Login
                        handleLogin={this.login}
                        handleGoToSignUp={() => this.setAuthStatus(AuthStatus.SignUp)}
                        error={this.state.error}
                        isRequesting={this.state.isRequesting}
                    />
                </Page>;

            case AuthStatus.SignUp:
                return <Page title="Sign Up">
                    <SignUp
                        handleSignUp={this.signUp}
                        handleGoToLogin={() => this.setAuthStatus(AuthStatus.Login)}
                        error={this.state.error}
                        isRequesting={this.state.isRequesting}
                    />
                </Page>;

            default:
                return <NotFound handleGoBack={() => this.setAuthStatus(AuthStatus.Login)} />;
        }
    }
}

AuthContainer.propTypes = {
    onUserLoggedIn: PropTypes.func.isRequired,
}

export default AuthContainer;