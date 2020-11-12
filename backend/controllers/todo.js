const Todo = require('../models/Todo');
const User = require('../models/User');

// Get all todos created by a user
exports.getTodos = async (req, res) => {
  const userId = req.userId;
  try {
    // Find all todos created by the user
    // Populate createdBy property for each todo, display firstName and lastName
    const todos = await Todo.find({ userId: userId });
    // .populate('userId');

    // Display an array of todos
    res.json({
      todos,
    });
  } catch (err) {
    console.log(err);
  }
};

// Create a todo
exports.createTodo = async (req, res) => {
  const userId = req.userId;
  // Create a new todo
  const newTodo = new Todo({
    userId: userId,
    subject: req.body.subject,
    description: req.body.description,
    deadline: req.body.deadline,
    createdAt: new Date(),
    // status = req.body.status
  });
  try {
    // Validate user's input

    // Find user by id
    const user = await User.findById(userId, 'todos');
    // Push newTodo to todos array in users collection
    user.todos.push(newTodo);

    // Save to todos collection
    await newTodo.save();
    // Save to user document
    await user.save();

    // Display result
    res.json({
      message: 'Added a todo',
      todo: newTodo,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const userId = req.userId;
  try {
    // In todos collection, find the todo by the id specified in params
    const todo = await Todo.findByIdAndDelete(req.params.todoId);

    // In users collection, find userId
    // const user = await User.findById(userId);

    res.json({
      message: 'Removed a todo',
    });
  } catch (err) {
    res.json({
      message: 'Unable to find the todo',
      error: err,
    });
  }
};
