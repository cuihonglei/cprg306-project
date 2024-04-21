// Import the useUserAuth hook
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Head({ pendingCount }) {

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, firebaseSignOut } = useUserAuth();

  // Sign out of Firebase
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      // Handle sign-out error
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-screen-lg mx-auto py-4">
      {/* Left content (User greeting and photo) */}
      <div className="flex items-center space-x-2">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <div>Hi {user.displayName} 👋</div>
          {pendingCount > 0 ?
            <div className="text-red-500">{pendingCount} tasks pending</div> :
            <div className="text-purple-500">all tasks done</div>
          }
        </div>
      </div>

      {/* Centered content (Title) */}
      <div className="text-center font-bold text-3xl">Another To-Do List</div>

      {/* Right content (Sign-out button) */}
      <button
        className="text-purple-500 hover:text-purple-600 font-bold py-2 px-4 rounded-2xl border-purple-500 hover:border-purple-600"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  )
}