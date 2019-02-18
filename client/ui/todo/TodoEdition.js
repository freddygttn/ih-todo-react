import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a Todo in edit mode.
 */
class TodoEdition extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
        };

        this.canSubmit = this.canSubmit.bind(this)
    }

    canSubmit() {
        const isTitleDiffenrent = this.state.title != this.props.initialTodo.title;
        const isDescriptionDifferent = this.state.description != this.props.initialTodo.description;
        const isTitleNotEmpty = this.state.title.trim().length > 0;
        return isTitleNotEmpty && (isTitleDiffenrent || isDescriptionDifferent);
    }

    handleSubmit() {
        if (this.canSubmit()) {
            const { title, description } = this.state;
            this.props.handleAction(title, description);
            this.setState(() => ({ title: "", description: "" }))
            this.titleInput.focus();
        }
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

    componentDidMount() {
        this.setState(({
            title: this.props.initialTodo.title,
            description: this.props.initialTodo.description,
        }));
    }

    render() {
        return (
            <form className="TodoEdition" onSubmit={e => {
                e.preventDefault();
                this.handleSubmit();
            }}>
                <div className="TodoEdition-Fields">
                    <div>
                        <input type="text"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={(e) => this.updateTitle(e.target.value)}
                            ref={(el) => this.titleInput = el}
                        />
                    </div>
                    <div>
                        <input type="text"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(e) => this.updateDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="TodoEdition-Actions">
                    <input type="submit" value={this.props.actionLabel} disabled={!this.canSubmit()} />
                    {this.props.handleCancel && <button onClick={this.props.handleCancel}>Cancel</button>}
                </div>
                <div className="TodoEdition-Error">
                    {this.props.error ? this.props.error : ""}
                </div>
            </form>
        );
    }
}

TodoEdition.propTypes = {
    initialTodo: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    handleCancel: PropTypes.func,
    handleAction: PropTypes.func.isRequired,
    actionLabel: PropTypes.string.isRequired
};

export default TodoEdition;