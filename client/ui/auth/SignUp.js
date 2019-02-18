import React from "react";
import PropTypes from "prop-types";

class SignUp extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>SignUp</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleSignUp(this.userInput.value, this.passwordInput.value);
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
                        <input type="submit" value="Sign Up" />
                    </div>
                    <div>
                        {this.props.error ? this.props.error : ""}
                    </div>
                    <div>
                        <a href="#" onClick={() => this.props.handleGoToLogin()}>Already have an account? Login</a>
                    </div>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    error: PropTypes.string,
    handleSignUp: PropTypes.func.isRequired,
    handleGoToLogin: PropTypes.func.isRequired,
}

export default SignUp;