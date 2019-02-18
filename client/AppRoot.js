import React from "react";
import Api from "./data/AuthApi";

import AuthContainer from "./domain/AuthContainer";
import TodosContainer from "./domain/TodosContainer";
import NotFound from "./ui/NotFound";

const AppStatus = {
    "Loading": "STATUS/LOADING",
    "LoggedIn": "STATUS/LOGGED_IN",
    "NeedAuth": "STATUS/NEED_AUTH",
}

class AppRoot extends React.Component {
    constructor() {
        super();
        this.state = {
            status: AppStatus.Loading,
            user: null,
        };
    }

    setAppUser(user) {
        this.setState((state, props) => ({ ...state, status: AppStatus.LoggedIn, user }));
    }

    setAppStatus(status) {
        this.setState((state, props) => ({ ...state, status }));
    }

    componentDidMount() {
        // Check logged in
        Api.isLoggedIn().then((response) => {
            this.setState((state, props) => ({
                ...state,
                status: AppStatus.LoggedIn,
                user: response.data,
            }));
        }).catch(error => {
            this.setState((state, props) => ({
                ...state,
                status: AppStatus.NeedAuth
            }));
        });
    }

    logout() {
        Api.logout()
            .then((response) => {
                this.setState((state, props) => ({
                    ...state,
                    status: AppStatus.NeedAuth,
                    user: null,
                }))
            })
            .catch(error => {
                // NOOP
            });
    }

    render() {
        switch (this.state.status) {
            case AppStatus.Loading:
                return (<div>
                    Loading...
                </div>);

            case AppStatus.NeedAuth:
                return <AuthContainer
                    onUserLoggedIn={(user) => this.setAppUser(user)} />;

            case AppStatus.LoggedIn:
                return (
                    <div>
                        <div>
                            <span>Logged in as {this.state.user.username}</span>
                            <button onClick={() => this.logout()}>Logout</button>
                        </div>
                        <TodosContainer />
                    </div>);

            default:
                return <NotFound handleGoBack={() => this.user ? this.setAppStatus(AppStatus.LoggedIn) : this.setAppStatus(AppStatus.NeedAuth)} />;
        }
    }
}
export default AppRoot;