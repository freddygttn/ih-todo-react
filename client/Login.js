import React from "react";
import Api from "./Api";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
        };
    }

    login() {
        Api.login(this.userInput.value, this.passwordInput.value)
            .then((response) => {
                if (response.data && response.data.message) {
                    this.setState((state, props) => ({ ...state, error: response.data.message }));
                }
                else {
                    this.props.userLoggedIn(response.data);
                }
            })
            .catch(error => {
                this.setState((state, props) => ({ ...state, error }));
            })
    }

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
                        <button onClick={(e) => { e.preventDefault(); this.login(); }}>Sign in</button>
                    </div>
                    <div>
                        {this.state.error ? this.state.error : ""}
                    </div>
                    <div>
                        <a href="#" onClick={() => this.props.goToSignUp()}>No account? Sign up</a>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;