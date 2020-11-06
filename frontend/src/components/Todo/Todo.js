import React from 'react';

const Todo = ({ subject, description, deadline, todo, todos, setTodos }) => {
  //events
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id));
    // console.log(todo);
  };

  const completeHandler = () => {
    setTodos(
      todos.map(item => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  //todo.completed use for strikethrough
  return (
    <div className="todo">
      <li>
        <span className={`todo-subject ${todo.completed ? 'completed' : ''}`}>
          {subject}
        </span>
        <span className={`todo-description ${todo.completed ? 'completed' : ''}`}>
          {description}
        </span>
        <span className={`todo-deadline ${todo.completed ? 'completed' : ''}`}>
          {deadline}
        </span>
      </li>
      <div className="todo-list-buttons">
        <button onClick={completeHandler} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={deleteHandler} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
