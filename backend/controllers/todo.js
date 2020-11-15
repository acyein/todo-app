const Todo = require('../models/Todo');
const User = require('../models/User');

// Get all todos created by a user
exports.getTodos = async (req, res) => {
  const userId = req.userId;
  try {
    // Find all todos that match the userId
    const todos = await Todo.find({ userId: userId });

    // Display an array of todos
    res.json({
      todos,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Create a todo
exports.createTodo = async (req, res) => {
  const userId = req.userId;
  const subject = req.body.subject;
  const description = req.body.description;
  const deadline = req.body.deadline;
  // Create a new todo
  const newTodo = new Todo({
    userId: userId,
    subject: subject,
    description: description,
    deadline: deadline,
    createdAt: new Date(),
    // status = req.body.status
  });
  try {
    // Validate user's input

    // Get todos array from users collection
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
    return res.status(500).send(err);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const userId = req.userId;
  const todoId = req.params.todoId;
  try {
    // Check if todoId and userId match
    const match = await Todo.exists({ _id: todoId, userId: userId });
    if (!match)
      return res
        .status(400)
        .send('Todo does not exist / is not created by you');

    // Get todos array from users collection
    const user = await User.findById(userId, 'todos');

    // Pull todoId out of todos array
    user.todos.pull(todoId);

    // Remove from todos collection
    await Todo.findByIdAndDelete(todoId);
    // Remove from user document
    await user.save();

    // Display message
    res.json({
      message: 'Todo removed',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
