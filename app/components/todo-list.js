export default function TodoList({ todos }) {
  return (
    <>
      <ul className="mx-8">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}