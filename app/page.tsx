'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { title } from 'process';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post('/api/todos', { title: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    console.log(id);
    const response = await axios.put(`/api/todos/${id}`, {
      completed: !completed,
      title: title,
    });
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>To-Do List</h1>
      <div className='mt-4'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='New to-do'
          className='border p-2 mr-2'
        />
        <button onClick={addTodo} className='bg-blue-500 text-white p-2'>
          Add
        </button>
      </div>
      <ul className='mt-4'>
        {todos.map((todo) => (
          <li key={todo._id} className='flex items-center space-x-4'>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, todo.completed)}
            />
            <span className={`${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className='text-red-500'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
