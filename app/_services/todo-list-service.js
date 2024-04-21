import { db } from "../_utils/firebase";
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query } from "firebase/firestore";

export const getTodos = async (userId) => {

  // Get data from firestore.
  const querySnapshot = await getDocs(query(collection(db, "users", userId, "todos")));
  
  // Return todo list.
  let todos = [];
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    todos.push({id: doc.id, ...doc.data()})
  });
  return todos;
};

export const addTodo = async (userId, todo) => {
  try {
    // Add item to Firestore collection
    const docRef = await addDoc(collection(db, "users", userId, "todos"), todo);

    // Return the ID of the added document
    return docRef.id;
  } catch (error) {
    // Handle error if document addition fails
    console.error("Error adding todo:", error);
    throw new Error("Failed to add todo. Please try again.");
  }
};

export const removeTodo = async (userId, todoId) => {
  try {
    // Construct the reference to the todo document
    const todoDocRef = doc(db, "users", userId, "todos", todoId);

    // Delete the todo document
    await deleteDoc(todoDocRef);

    // Return success or handle any other post-delete logic
    return true;
  } catch (error) {
    console.error("Error removing todo:", error);
    // Handle error or return false
    return false;
  }
};

export const completeTodo = async (userId, todoId, completed) => {
  try {
    // Construct the reference to the todo document
    const todoDocRef = doc(db, "users", userId, "todos", todoId);

    // Update the completion status of the todo document
    await updateDoc(todoDocRef, { completed });

    // Return success or handle any other post-update logic
    return true;
  } catch (error) {
    console.error("Error completing todo:", error);
    // Handle error or return false
    return false;
  }
};