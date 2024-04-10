"use client";

import { useState, useEffect } from "react";

// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";
// Import the db services
import { getTodos, addTodo } from "./_services/todo-list-service";

// Import the components
import Intro from "./components/intro";
import TodoList from "./components/todo-list";


export default function Home() {

  // Todo list for current user.
  const [todos, setTodos] = useState([]);

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();

  // Sign in to Firebase with Google authentication
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // Handle sign-in error
      console.error("Error signing in with Google:", error);
    }
  };

  // Sign out of Firebase
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      // Handle sign-out error
      console.error("Error signing out:", error);
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

  const handleAddTodo = async (todo) => {
    try {
      const id = await addTodo(user.uid, todo);
      todo.id = id;
      setTodos((prevTodos) => [...prevTodos, todo]);
    } catch (error) {
      console.error("Error add todo:", error);
    }
  };

  // Load todo list for the current user.
  useEffect(() => {
    if (user) {
      loadTodos(user.uid);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email}).</p>

          {/* Button to trigger sign-out */}
          <button onClick={handleSignOut}>Sign out</button>

          {/* Todo list */}
          <TodoList todos={todos} />
        </div>
      ) : (
        <Intro onSignIn={handleGoogleSignIn} />
      )}
    </main>
  );
}
