import React from "react";
import ReactDOM from "react-dom";
import Api from "./Api";

import Login from "./Login";
import SignUp from "./SignUp";

const Status = {
    "Loading": "STATUS/LOADING",
    "LoggedIn": "STATUS/LOGGED_IN",
    "Login": "STATUS/LOGIN",
    "SignUp": "STATUS/SIGN_UP"
}

class AppRoot extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "world",
            status: Status.Loading,
            user: null,
        };
    }

    userLoggedIn(user) {
        this.setState((state, props) => ({ ...state, status: Status.LoggedIn, user }));
    }

    updateStatus(status) {
        this.setState((state, props) => ({ ...state, status }));
    }

    componentDidMount() {
        console.log("did mount");
        // Check logged in
        Api.isLoggedIn().then((response) => {
            this.setState((state, props) => ({
                ...state,
                status: Status.LoggedIn,
                user: response.data,
            }));
        }).catch(error => {
            this.setState((state, props) => ({
                ...state,
                status: Status.Login
            }));
        });
    }

    logout() {
        Api.logout()
            .then((response) => {
                this.setState((state, props) => ({
                    ...state,
                    status: Status.Login,
                    user: null,
                }))
            })
            .catch(error => {
                // NOOP
            });
    }

    render() {
        switch (this.state.status) {
            case Status.Login:
                return <Login
                    userLoggedIn={(user) => this.userLoggedIn(user)}
                    goToSignUp={() => this.updateStatus(Status.SignUp)} />;
            case Status.SignUp:
                return <SignUp
                    userLoggedIn={(user) => this.userLoggedIn(user)}
                    goToLogin={() => this.updateStatus(Status.Login)} />;
            case Status.LoggedIn:
                return (<div>
                    Hello {this.state.user.username}!
                    <button onClick={() => this.logout()}>Logout</button>
                </div>);
            default:
                return (<div>
                    Hello {this.state.title}
                    <div>{this.state.status}</div>

                </div>);

        }
    }
}
export default AppRoot;