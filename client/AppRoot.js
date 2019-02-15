import React from "react";
import ReactDOM from "react-dom";

class AppRoot extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "world"
        };
    }
    render() {
        return (
            <div>
                Hello {this.state.title}
            </div>
        );
    }
}
export default AppRoot;