const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken');

const todoController = require('../controllers/todo');

router.get('/', verifyToken, todoController.getTodo);
router.post('/create', verifyToken, todoController.createTodo);
router.delete('/:todoId/completed', verifyToken, todoController.deleteTodo);

// router.put('', verifyToken, todoController.editTodo);
// router.get('', verifyToken, todoController.searchTodo);

module.exports = router;
