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
    console.log('handRemove');
  }

  const handleComplete = async (todo) => {
    console.log('handleComplete');
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

  return (
    <main className="flex min-h-screen flex-col items-center">
      {user ? (
        <div className="w-full">
          {/* Head */}
          <Head />

          {/* Todo list */}
          <TodoList todos={todos} onAdd={handleAdd} onRemove={handleRemove} onComplete={handleComplete} />
        </div>
      ) : (
        <Intro onSignIn={handleGoogleSignIn} />
      )}
    </main>
  );
}
