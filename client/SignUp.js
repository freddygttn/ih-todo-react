import React from "react";
import Api from "./Api";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
        };
    }

    signUp() {
        Api.signUp(this.userInput.value, this.passwordInput.value)
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
                        <button onClick={(e) => { e.preventDefault(); this.signUp(); }}>Sign in</button>
                    </div>
                    <div>
                        {this.state.error ? this.state.error : ""}
                    </div>
                    <div>
                        <a href="#" onClick={() => this.props.goToLogin()}>Already have an account? Login</a>
                    </div>
                </form>
            </div>
        );
    }
}
export default SignUp;