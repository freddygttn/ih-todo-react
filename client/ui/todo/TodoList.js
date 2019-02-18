import React from "react";
import PropTypes from "prop-types";

import Todo from "./Todo";
import TodoEdition from "./TodoEdition";

/**
 * Renders a list of Todos.
 */
class TodoList extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>Todo List</h2>
                <ul>
                    <li>
                        <TodoEdition
                            initialTodo={{ title: "", description: "" }}
                            actionLabel={"Add"}
                            handleAction={(title, description) => {
                                this.props.handleCreate(title, description);
                            }} />
                    </li>
                    {this.props.todos.map(todo => {
                        return todo.editing ?
                            (
                                <li key={todo._id}>
                                    <TodoEdition
                                        initialTodo={todo}
                                        actionLabel={"Update"}
                                        handleCancel={() => this.props.cancelEdit(todo._id)}
                                        handleAction={(title, description) => {
                                            this.props.handleUpdate(todo._id, title, description);
                                        }} />
                                </li>
                            )
                            :
                            (
                                <li key={todo._id}>
                                    <Todo
                                        todo={todo}
                                        handleRemove={() => this.props.handleRemove(todo._id)}
                                        handleEdit={() => this.props.edit(todo._id)}
                                    />
                                </li>
                            )
                    })
                    }
                </ul>
            </div>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    })).isRequired,
    error: PropTypes.string,
    handleCreate: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
};

export default TodoList;