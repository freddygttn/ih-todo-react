import React from "react";
import PropTypes from "prop-types";

import Api from "../data/AuthApi";
import Login from "../ui/auth/Login";
import SignUp from "../ui/auth/SignUp";
import NotFound from "../ui/NotFound";

const AuthStatus = {
    "Login": "AUTH_STATUS/LOGIN",
    "SignUp": "AUTH_STATUS/SIGN_UP"
}

class AuthContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            status: AuthStatus.Login,
            error: null,
        };

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    setAuthStatus(status) {
        this.setState(() => ({ status, error: null }));
    }

    login(username, password) {
        Api.login(username, password)
            .then((response) => {
                if (response.data && response.data.message) {
                    this.setState((state) => ({ ...state, error: response.data.message }));
                }
                else {
                    this.props.onUserLoggedIn(response.data);
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error: "Caught unchecked error: " + JSON.stringify(error) }));
            });
    }

    signUp(username, password) {
        Api.signUp(username, password)
            .then((response) => {
                if (response.data && response.data.message) {
                    this.setState((state) => ({ ...state, error: response.data.message }));
                }
                else {
                    this.props.onUserLoggedIn(response.data);
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error: "Caught unchecked error: " + JSON.stringify(error) }));
            });
    }

    render() {
        switch (this.state.status) {
            case AuthStatus.Login:
                return <Login
                    handleLogin={this.login}
                    handleGoToSignUp={() => this.setAuthStatus(AuthStatus.SignUp)}
                    error={this.state.error}
                />;

            case AuthStatus.SignUp:
                return <SignUp
                    handleSignUp={this.signUp}
                    handleGoToLogin={() => this.setAuthStatus(AuthStatus.Login)}
                    error={this.state.error}
                />;

            default:
                return <NotFound handleGoBack={() => this.setAuthStatus(AuthStatus.Login)} />;
        }
    }
}

AuthContainer.propTypes = {
    onUserLoggedIn: PropTypes.func.isRequired,
}

export default AuthContainer;