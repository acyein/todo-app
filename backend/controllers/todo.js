const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const Todo = require('../models/Todo');
const User = require('../models/User');

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.TOKEN_SECRET);
}

// Get todos
exports.getTodo = async (req, res) => {
  const todos = await Todo.find();
  if (!todos) return res.status(400).send('Cannot find todos');

  // await newTodo.populate('user', {path: 'user'})
  // .execPopulate(function (err, todo) {
  //   if (err) return handleError(err);
  //   console.log(todo);
  // });
  
  res.json({
    todos: todos,
  });
};

exports.createTodo = async (req, res) => {
  const newTodo = new Todo({
    subject: req.body.subject,
    description: req.body.description,
    deadline: req.body.deadline
    // status = req.body.status
  });
  try {
    // const user = req.user;
    const savedTodo = await newTodo.save();
    
    res.json({
      message: 'Added a todo',
      todo: savedTodo,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete todos
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.json({
      message: 'Removed a todo',
    });
  } catch (err) {
    res.json({
      message: 'Cannot find the todo',
    });
  }
};
