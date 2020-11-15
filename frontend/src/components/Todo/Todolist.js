import React from 'react';
// import React, { useEffect } from 'react';

// import instance from '../../axios';
import Todo from './Todo';

const TodoList = ({ todos, setTodos, filteredTodos }) => {
  // console.log(todos);
  // useEffect(() => {
  //   instance
  //     .get('/todos')
  //     // .then(res => {
  //     //   console.log(res);
  //     //   // setTodos(res.data);
  //     // })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // })

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <Todo
            setTodos={setTodos}
            todos={todos}
            key={todo.id}
            todo={todo}
            subject={todo.subject}
            description={todo.description}
            deadline={todo.deadline}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
