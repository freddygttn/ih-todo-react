import React from "react";
import PropTypes from "prop-types";

class Login extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleLogin(this.userInput.value, this.passwordInput.value);
                }}>
                    <div>
                        <span>Username</span>
                        <input
                            type="text"
                            placeholder="Username"
                            ref={e => this.userInput = e}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="Password"
                            ref={e => this.passwordInput = e}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Log in" />
                    </div>
                    <div>
                        {this.props.error ? this.props.error : ""}
                    </div>
                    <div>
                        <a href="#" onClick={() => this.props.handleGoToSignUp()}>No account? Sign up</a>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    error: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    handleGoToSignUp: PropTypes.func.isRequired,
}

export default Login;