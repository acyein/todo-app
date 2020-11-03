import React from "react";

const Form = ({setInputText, setDescriptionText, todos, setTodos, inputText, descriptionText, setStatus}) =>{
  
  const inputTextHandler = (e) =>{
    //console.log(e.target.value);
    setInputText(e.target.value);
  };

  const inputDescriptionHandler = (e) => {
    setDescriptionText(e.target.value);
  }

  const submitTodoHandler = (e)=>{
    e.preventDefault();
    setTodos([
      ...todos,
      {text:inputText, desc:descriptionText, completed:false, id:Math.random()*1000},
    ]);
    setInputText('');   //reset to zero
    setDescriptionText('');
  };

  const statusHandler = (e) =>{
    // console.log(e.target.value);
    setStatus(e.target.value);
  }

  return(
    <form className="todo-form">
      <input 
      value={inputText} 
      onChange={inputTextHandler} 
      type="text" 
      className="todo-input"
      placeholder="Task"
      />
      <input 
      value={descriptionText} 
      onChange={inputDescriptionHandler} 
      type="text" 
      className="todo-input"
      placeholder="Description"
      />
      <button onClick={submitTodoHandler} className="plus-button" type="submit">
        <i className= "fas fa-plus fa-2x"></i>
      </button>
      <div className="select-container">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="" disabled selected>Filter by</option>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;

