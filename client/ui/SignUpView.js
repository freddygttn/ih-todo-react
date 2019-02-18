import React from "react";
import PropTypes from "prop-types";

class SignUpView extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>SignUp</h2>
                <form>
                    <div>
                        <span>User</span>
                        <input type="text" ref={e => this.userInput = e} />
                    </div>
                    <div>
                        <span>Password</span>
                        <input type="password" ref={e => this.passwordInput = e} />
                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            this.props.handleSignUp(this.userInput.value, this.passwordInput.value);
                        }}>Sign up</button>
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

SignUpView.propTypes = {
    error: PropTypes.string,
    handleSignUp: PropTypes.func.isRequired,
    handleGoToLogin: PropTypes.func.isRequired,
}

export default SignUpView;