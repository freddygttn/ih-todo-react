import React from "react";
import TaskApi from "./data/TaskApi";

import Todo from "./Todo";
import TodoEdition from "./TodoEdition";

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            error: null,
        };
    }

    componentDidMount() {
        TaskApi.list()
            .then((response) => {
                if (response.data) {
                    this.setState((state, props) => ({ ...state, todos: response.data }));
                }
            });
    }

    create() {
        const title = this.titleInput.value;
        const description = this.descriptionInput.value;
        TaskApi.create(title, description)
            .then((response) => {
                if (response.data && response.data._id) {
                    this.setState((state, props) => ({ ...state, todos: [response.data].concat(state.todos) }));
                }
            })
            .catch(error => {
                this.setState((state, props) => ({ ...state, error }));
            });
    }

    remove(id) {
        TaskApi.remove(id)
            .then((response) => {
                if (response.data && response.data._id) {
                    const indexToRemove = this.state.todos.findIndex(todo => todo._id === response.data._id);
                    this.setState((state, props) => ({
                        ...state,
                        todos: state.todos.slice(0, indexToRemove).concat(state.todos.slice(indexToRemove + 1, state.todos.length)),
                    }));
                }
            })
            .catch(error => {
                this.setState((state, props) => ({ ...state, error }));
            });
    }

    update(id, title, description) {
        TaskApi.update(id, title, description)
            .then((response) => {
                if (response.data && response.data._id) {
                    this.setState((state, props) => ({
                        ...state, todos: state.todos.map(todo =>
                            todo._id === response.data._id ?
                                { ...response.data, title, description }
                                : todo
                        )
                    }));
                }
            })
            .catch(error => {
                this.setState((state, props) => ({ ...state, error }));
            });
    }

    edit(id) {
        this.setState((state, props) => ({
            ...state,
            todos: state.todos.map(todo => ({ ...todo, editing: todo.editing || todo._id === id }))
        }));
    }

    cancelEdit(id) {
        this.setState((state, props) => ({
            ...state,
            todos: state.todos.map(todo => ({ ...todo, editing: todo.editing && todo._id !== id }))
        }));
    }

    render() {
        return (
            <div>
                <h2>Todo List</h2>
                <h3>New</h3>
                <form>
                    <div>
                        <span>Title</span>
                        <input type="text" ref={e => this.titleInput = e} />
                    </div>
                    <div>
                        <span>Description</span>
                        <input type="text" ref={e => this.descriptionInput = e} />
                    </div>
                    <div>
                        <button onClick={(e) => { e.preventDefault(); this.create(); }}>Add</button>
                    </div>
                    <div>
                        {this.state.error ? this.state.error : ""}
                    </div>
                </form>
                <h3>Todos</h3>
                <ul>
                    {this.state.todos.map(todo => {
                        return todo.editing ?
                            (
                                <li key={todo._id}>
                                    <TodoEdition
                                        todo={todo}
                                        handleCancel={() => this.cancelEdit(todo._id)}
                                        handleUpdate={(title, description) => {
                                            this.update(todo._id, title, description);
                                        }} />
                                </li>
                            )
                            :
                            (
                                <li key={todo._id}>
                                    <Todo
                                        todo={todo}
                                        handleRemove={() => this.remove(todo._id)}
                                        handleEdit={() => this.edit(todo._id)}
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
export default TodoList;