import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import TodoItem from './todo-item';

export default function TodoList({ todos, onAdd, onRemove, onComplete }) {
  const [showForm, setShowForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    // Handle adding the new task, send data to backend, update state, etc.
    onAdd({text: newTaskText, completed: false});

    // Reset form state
    setNewTaskText('');
    setShowForm(false); // Hide the form after submitting
  };

  const handleInputChange = (e) => {
    setNewTaskText(e.target.value); // Update new task text input
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto py-4">
      {/* Add Task Button */}
      <div className="flex justify-between items-center mb-4 ml-32 text-xl">
        <button
          className="text-purple-500 hover:text-purple-600 font-bold py-2 px-4 rounded-2xl border-purple-500 hover:border-purple-600 flex items-center"
          onClick={() => setShowForm(true)}
        >
          <FaPlusCircle className="mr-2" /> Add New Task
        </button>
      </div>

      {/* Popup Form for Adding New Task */}
      {showForm && (
        <form className="ml-32 mb-4" onSubmit={handleAdd}>
          <input
            type="text"
            value={newTaskText}
            onChange={handleInputChange}
            placeholder="Enter new task..."
            className="border rounded px-3 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Todo List */}
      <ul className="ml-32">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onRemove={onRemove} onComplete={onComplete} />
        ))}
      </ul>
    </div>
  );
}
