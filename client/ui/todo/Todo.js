import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a todo.
 */
export const Todo = ({ position, todo, handleRemove, handleEdit, ...props }) => {
    return (
        <div className="Todo">
            <div>
                <div className="Todo-Title">{todo.title}</div>
                <div className="Todo-Description">{todo.description}</div>
            </div>
            <div className="Todo-Actions">
                <button onClick={handleRemove}>Remove</button>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
}

Todo.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default Todo;