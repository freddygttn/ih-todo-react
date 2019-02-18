import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a todo.
 */
export const Todo = ({ todo, handleRemove, handleEdit, ...props }) => {
    return (
        <div>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>
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