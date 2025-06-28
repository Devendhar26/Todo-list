export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li
      className={`p-4 my-2 rounded flex justify-between items-center bg-white text-black shadow-md ${
        todo.completed ? 'line-through bg-gray-200' : ''
      }`}
    >
      <span
        onClick={() => toggleComplete(todo._id, todo.completed)}
        className="cursor-pointer"
      >
        {todo.task}
      </span>
      <button
        onClick={() => deleteTodo(todo._id)}
        className="text-red-600 hover:text-red-800"
      >
        ❌
      </button>
    </li>
  );
}
