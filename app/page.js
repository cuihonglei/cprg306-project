"use client";

// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";

export default function Home() {

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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>cprg306-project by honglei</p>
      <p>Todo list with user accounts: Users can create an account, log in, and manage their own todo lists.</p>

      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email}).</p>

          {/* Button to trigger sign-out */}
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div>
          {/* Button to trigger Google sign-in */}
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      )}

    </main>
  );
}
