import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

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

  // Add item to firestore.
  const docRef = await addDoc(collection(db, "users", userId, "todos"), todo);

  // Resturn item ID.
  return docRef.id;
};