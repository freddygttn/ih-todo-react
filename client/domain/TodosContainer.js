import React from "react";
import TaskApi from "../data/TaskApi";

import TodoList from "../ui/todo/TodoList";

/**
 * Containers that encapsulates todos logic.
 */
class TodosContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            error: null,
        };

        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.edit = this.edit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        // Load todos as soon as the component is mounted
        TaskApi.list()
            .then((response) => {
                if (response.data) {
                    this.setState((state, props) => ({ ...state, todos: response.data }));
                }
            });
    }

    // Creates a todo given a title and a description
    create(title, description) {
        TaskApi.create(title, description)
            .then((response) => {
                if (response.data && response.data._id) {
                    this.setState((state) => ({ ...state, todos: [response.data].concat(state.todos) }));
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error }));
            });
    }

    // Removes a todo given its id
    remove(id) {
        TaskApi.remove(id)
            .then((response) => {
                if (response.data && response.data._id) {
                    const indexToRemove = this.state.todos.findIndex(todo => todo._id === response.data._id);
                    this.setState((state) => ({
                        ...state,
                        todos: state.todos.slice(0, indexToRemove).concat(state.todos.slice(indexToRemove + 1, state.todos.length)),
                    }));
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error }));
            });
    }

    // Updates a todo given its id, its new title and new description
    update(id, title, description) {
        TaskApi.update(id, title, description)
            .then((response) => {
                if (response.data && response.data._id) {
                    this.setState((state) => ({
                        ...state, todos: state.todos.map(todo =>
                            todo._id === response.data._id ?
                                { ...response.data, title, description }
                                : todo
                        )
                    }));
                }
            })
            .catch(error => {
                this.setState((state) => ({ ...state, error }));
            });
    }

    // Set a todo to edit mode
    edit(id) {
        this.setState((state) => ({
            ...state,
            todos: state.todos.map(todo => ({ ...todo, editing: todo.editing || todo._id === id }))
        }));
    }

    // Cancel todo edit mode
    cancelEdit(id) {
        this.setState((state) => ({
            ...state,
            todos: state.todos.map(todo => ({ ...todo, editing: todo.editing && todo._id !== id }))
        }));
    }

    render() {
        return <TodoList
            todos={this.state.todos}
            error={this.state.error}
            handleCreate={this.create}
            handleRemove={this.remove}
            handleUpdate={this.update}
            edit={this.edit}
            cancelEdit={this.cancelEdit}
        />;
    }
}

TodosContainer.propTypes = {};

export default TodosContainer;