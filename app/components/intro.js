export default function Intro({ onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center mt-48 text-center">
      <p className="text-3xl font-bold mb-4">Another To-Do List</p>
      <p className="text-lg text-gray-600 font-bold mb-8">Manage Your Task Checklist Easily</p>

      {/* Button to trigger Google sign-in */}
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={onSignIn}
      >
        {"Let's Start"}
      </button>
    </div>
  );
}
