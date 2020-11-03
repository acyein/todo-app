import React from "react";

const Form = ({setInputText, setDescriptionText, todos, setTodos, inputText, descriptionText, setStatus}) =>{
  
  const inputTextHandler = (e) =>{
    //console.log(e.target.value);
    setInputText(e.target.value);
    setDescriptionText(e.target.value);
  };

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
      placeholder="Subject"
      />
      <input 
      value={descriptionText} 
      onChange={inputTextHandler} 
      type="text" 
      className="todo-input"
      placeholder="Description"
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className= "fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;

