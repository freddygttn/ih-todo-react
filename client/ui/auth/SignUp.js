import React from "react";
import PropTypes from "prop-types";

/**
 * SignUp view
 */
class SignUp extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
        };

        this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
    }

    isSubmitDisabled() {
        return this.props.isRequesting
            || this.state.username.trim().length === 0
            || this.state.password.length === 0
            || this.state.repeatPassword.length === 0;
    }

    render() {
        return (
            <div>
                <h2>SignUp</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleSignUp(this.state.username, this.state.password, this.state.repeatPassword);
                }}>
                    <div>
                        <span>Username</span>
                        <input
                            type="text"
                            placeholder="Username"
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
                            onChange={(e) => {
                                const password = e.target.value;
                                this.setState((state) => ({ ...state, password }));
                            }}
                        />
                    </div>
                    <div>
                        <span>Repeat password</span>
                        <input
                            type="password"
                            placeholder="Repeat password"
                            onChange={(e) => {
                                const repeatPassword = e.target.value;
                                this.setState((state) => ({ ...state, repeatPassword }));
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Sign Up"
                            disabled={this.isSubmitDisabled()}
                        />
                    </div>
                    <div>
                        {this.props.error ? this.props.error : ""}
                    </div>
                    <div>
                        <a
                            href="#"
                            onClick={() => this.props.handleGoToLogin()}
                        >
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    isRequesting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleSignUp: PropTypes.func.isRequired,
    handleGoToLogin: PropTypes.func.isRequired,
}

export default SignUp;