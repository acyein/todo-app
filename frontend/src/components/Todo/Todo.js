import React from 'react';

const Todo = ({ text, desc, todo, todos, setTodos }) => {
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
        {/* <label>Task</label> */}
        <span className={`todo-subject ${todo.completed ? 'completed' : ''}`}>
          {text}
        </span>
        {/* <label>Description</label> */}
        <span className={`todo-desc ${todo.completed ? 'completed' : ''}`}>
          {desc}
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
