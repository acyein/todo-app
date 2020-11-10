import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import instance from '../axios';
import '../App.css';
import './Todo.css';
//importing component
import Form from '../components/Todo/Form';
import TodoList from '../components/Todo/Todolist';

export function Todo() {
  //state stuff
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use Effect
  useEffect(() => {
    // console.log('hey')
    filteredHandler();
    // eslint-disable-next-line
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
        // default is 'all'
        setFilteredTodos(todos);
        break;
    }
  };

  //save to local
  // const saveLocalTodos = () => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // };

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
      <nav className="navbar">
        <div className="navbar-header">
          <Link to="/todos" className="navbar-brand nav-link">
            <img className="logo" src="/logo.svg" alt="logo" />
            Tick Me
          </Link>
        </div>
        <ul className="nav">
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
      <Form
        subject={subject}
        setSubject={setSubject}
        description={description}
        setDescription={setDescription}
        deadline={deadline}
        setDeadline={setDeadline}
        search={search}
        setSearch={setSearch}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
        showSearchFilter={showSearchFilter}
        setShowSearchFilter={setShowSearchFilter}
      />

      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}
