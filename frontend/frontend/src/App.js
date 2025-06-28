import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (task.trim()) {
      const res = await axios.post('http://localhost:5000/api/todos', {
        task,
        completed: false,
      });
      setTodos([res.data, ...todos]);
      setTask('');
    }
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !completed,
    });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>🧠 Devendhar's ToDo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add your next task..."
      />
      <button className="add-btn" onClick={addTodo}>➕ Add Task</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleComplete(todo._id, todo.completed)}
          >
            <span>{todo.task}</span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
