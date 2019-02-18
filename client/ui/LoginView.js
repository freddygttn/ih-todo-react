import React from "react";
import PropTypes from "prop-types";

class LoginView extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>Login</h2>
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
                            this.props.handleLogin(this.userInput.value, this.passwordInput.value);
                        }}>Log in</button>
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

LoginView.propTypes = {
    error: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    handleGoToSignUp: PropTypes.func.isRequired,
}

export default LoginView;