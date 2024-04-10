export default function Intro({onSignIn}) {
  return (
    <div>
      <p>Another To-Do List</p>
      <p>Manage You Task Checklist Easily</p>

      {/* Button to trigger Google sign-in */}
      <button onClick={onSignIn}>Let's Start</button>
    </div>
  )
}