import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function TodoItem({ todo, onRemove, onComplete }) {

  return (
    <li className="flex  items-center mb-2">
      {/* Remove button (trash icon) */}
      <button onClick={() => onRemove(todo)} className="mr-2">
        <FaTrashAlt />
      </button>

      {/* Checkbox for completion status */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onComplete(todo)}
        className="mr-2"
      />

      {/* Todo text (crossed out if completed) */}
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </span>
    </li>
  );
}
