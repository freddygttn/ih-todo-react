import React from "react";

class TodoEdition extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
        };
    }

    componentDidMount() {
        this.setState((state, props) => ({
            title: props.todo.title,
            description: props.todo.description,
        }));
    }

    updateTitle(title) {
        this.setState((state, props) => ({
            ...state,
            title,
        }));
    }

    updateDescription(description) {
        this.setState((state, props) => ({
            ...state,
            description,
        }));
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.title} onChange={(e) => this.updateTitle(e.target.value)} />
                </div>
                <div>
                    <input type="text" value={this.state.description} onChange={(e) => this.updateDescription(e.target.value)} />
                </div>
                <div>
                    {this.props.error ? this.props.error : ""}
                </div>
                <div>
                    <button onClick={this.props.handleCancel}>Cancel</button>
                    <button onClick={() => { this.props.handleUpdate(this.state.title, this.state.description); }}>Update</button>
                </div>
            </div>
        );
    }
}
export default TodoEdition;