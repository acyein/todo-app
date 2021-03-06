import React from 'react';

import instance from '../../axios';

const Form = ({
  subject,
  setSubject,
  description,
  setDescription,
  deadline,
  setDeadline,
  search,
  setSearch,
  todos,
  setTodos,
  setStatus,
  showSearchFilter,
  setShowSearchFilter,
}) => {
  const addSubjectHandler = e => {
    //console.log(e.target.value);
    setSubject(e.target.value);
  };

  const addDescriptionHandler = e => {
    setDescription(e.target.value);
  };

  const addDeadlineHandler = e => {
    setDeadline(e.target.value);
  };

  // Default should be uncompleted?
  const statusHandler = e => {
    setStatus(e.target.value);
  };

  const searchHandler = e => {
    setSearch(e.target.value);
  };

  const submitTodoHandler = e => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        subject: subject,
        description: description,
        deadline: deadline,
        completed: false,
        search: search, // CHECK
        showSearchFilter: false,
        id: Math.random() * 1000,
      },
    ]);

    // POST - create a todo
    instance
      .post('/todos/create', {
        subject: subject,
        description: description,
        deadline: deadline,
      })
      .then(res => {
        console.log(res.data);
        // Make fields empty
      })
      .catch(err => {
        console.log(err);
      });
      
    setSubject('');
    setDescription('');
    setDeadline('');
    setSearch('');
    setShowSearchFilter(true);
  };

  return (
    <form className="todo-form">
      <div className="todo-form-group">
        <label htmlFor="subject">Task</label>
        <input
          id="subject"
          value={subject}
          onChange={addSubjectHandler}
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
        />
      </div>
      <div className="todo-form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={addDescriptionHandler}
          type="text"
          className="todo-input"
          placeholder="More details..."
        />
      </div>
      <div className="todo-form-group">
        <label htmlFor="deadline" className="deadline-label">
          Deadline
        </label>
        <input
          id="deadline"
          value={deadline}
          onChange={addDeadlineHandler}
          type="date"
          className="todo-input"
        />
      </div>
      <button onClick={submitTodoHandler} className="btn add-btn" type="submit">
        Add
        <i className="fas fa-plus plus-btn"></i>
      </button>

      {/* Show search and filter bars after form is submitted */}
      {showSearchFilter ? (
        <div className="todo-form-group search-filter-container">
          <input
            value={search}
            onChange={searchHandler}
            type="text"
            className="search-input"
            placeholder="Search"
          />
          <div className="select-container">
            <select
              onChange={statusHandler}
              name="todos"
              className="filter-todo"
            >
              <option value="">Filter By</option>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default Form;
