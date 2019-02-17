import React from "react";

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

export default Todo;