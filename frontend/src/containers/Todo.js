import React, { useState, useEffect } from 'react';
import './Todo.css';
//importing component
import Form from '../components/Todo/Form';
import TodoList from '../components/Todo/Todolist';

export function Todo() {
  //state stuff
  const [inputText, setInputText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use Effect
  useEffect(() => {
    // console.log('hey')
    filteredHandler();
  }, [todos, status]);

  //functions
  const filteredHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="todo-body">
      <header className="todo-heading">
        <h1>Todo App List </h1>
      </header>
      <Form
        inputText={inputText}
        descriptionText={descriptionText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setDescriptionText={setDescriptionText}
        setStatus={setStatus}
      />

      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}