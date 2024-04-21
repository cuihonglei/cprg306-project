"use client";

import { useState, useEffect } from "react";

// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";
// Import the db services
import { getTodos, addTodo, removeTodo, completeTodo } from "./_services/todo-list-service";

// Import the components
import Intro from "./components/intro";
import TodoList from "./components/todo-list";
import Head from "./components/head";

export default function Home() {

  // Todo list for current user.
  const [todos, setTodos] = useState([]);

  // Tasks count pending.
  const [pendingCount, setPendingCount] = useState(0);

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn } = useUserAuth();

  // Sign in to Firebase with Google authentication
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // Handle sign-in error
      console.error("Error signing in with Google:", error);
    }
  };

  const handleAdd = async (todo) => {
    try {
      const id = await addTodo(user.uid, todo);
      todo.id = id;
      setTodos((prevTodos) => [...prevTodos, todo]);
    } catch (error) {
      console.error("Error add todo:", error);
    }
  };

  const handleRemove = async (todo) => {
    try {
      // Call the removeTodo service function to delete the todo item
      const success = await removeTodo(user.uid, todo.id);
      if (success) {
        // Filter out the removed todo item from the todos state
        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
      } else {
        console.error(`Failed to remove todo with ID ${todo.id}`);
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };
  
  const handleComplete = async (todo) => {
    try {
      // Determine the new completion status (toggle)
      const newCompletedStatus = !todo.completed;
  
      // Call the completeTodo service function to update the completion status
      const success = await completeTodo(user.uid, todo.id, newCompletedStatus);
      if (success) {
        // Update the completion status of the todo item in the todos state
        setTodos((prevTodos) =>
          prevTodos.map((item) =>
            item.id === todo.id ? { ...item, completed: newCompletedStatus } : item
          )
        );
      } else {
        console.error(`Failed to update completion status for todo with ID ${todo.id}`);
      }
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  const loadTodos = async () => {
    try {
      const todosData = await getTodos(user.uid);
      //console.log(todosData);
      setTodos(todosData);
    } catch (error) {
      console.error("Error get todos:", error);
    }
  };

  // Load todo list for the current user.
  useEffect(() => {
    if (user) {
      loadTodos(user.uid);
    }
  }, [user]);

  // Recalculate pending count whenever todos change
  useEffect(() => {
    setPendingCount(todos.filter((todo) => !todo.completed).length);
  }, [todos]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {user ? (
        <div className="w-full">
          {/* Head */}
          <Head pendingCount={pendingCount} />

          {/* Todo list */}
          <TodoList todos={todos} onAdd={handleAdd} onRemove={handleRemove} onComplete={handleComplete} />
        </div>
      ) : (
        <Intro onSignIn={handleGoogleSignIn} />
      )}
    </main>
  );
}
