import React from "react";
import PropTypes from "prop-types";

/**
 * Login view.
 */
class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };

        this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
    }

    isSubmitDisabled() {
        return this.props.isRequesting
            || this.state.username.trim().length === 0
            || this.state.password.length === 0;
    }

    render() {
        return (
            <form className="Auth" onSubmit={(e) => {
                e.preventDefault();
                this.props.handleLogin(this.state.username.trim(), this.state.password);
            }}>
                <label className="Auth-Field">
                    <div>Username</div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={(e) => {
                            const username = e.target.value;
                            this.setState((state) => ({ ...state, username }));
                        }}
                    />
                </label>
                <label className="Auth-Field">
                    <div>Password</div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => {
                            const password = e.target.value;
                            this.setState((state) => ({ ...state, password }));
                        }}
                    />
                </label>
                <div className="Auth-Submit">
                    <input
                        type="submit"
                        value="Log In"
                        disabled={this.isSubmitDisabled()}
                    />
                </div>
                <div className="Auth-Error">
                    {this.props.error ? this.props.error : ""}
                </div>
                <div className="Auth-Link">
                    <a
                        href="#"
                        onClick={() => this.props.handleGoToSignUp()}
                    >
                        No account? Sign up
                        </a>
                </div>
            </form>
        );
    }
}

Login.propTypes = {
    isRequesting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    handleGoToSignUp: PropTypes.func.isRequired,
}

export default Login;