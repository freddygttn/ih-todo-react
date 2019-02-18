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
            <div>
                <h2>Login</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleLogin(this.state.username.trim(), this.state.password);
                }}>
                    <div>
                        <span>Username</span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={(e) => {
                                const username = e.target.value;
                                this.setState((state) => ({ ...state, username }));
                            }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => {
                                const password = e.target.value;
                                this.setState((state) => ({ ...state, password }));
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Log In"
                            disabled={this.isSubmitDisabled()}
                        />
                    </div>
                    <div>
                        {this.props.error ? this.props.error : ""}
                    </div>
                    <div>
                        <a
                            href="#"
                            onClick={() => this.props.handleGoToSignUp()}
                        >
                            No account? Sign up
                        </a>
                    </div>
                </form>
            </div>
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