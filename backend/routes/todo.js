const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken');

const todoController = require('../controllers/todo');

router.post('/create', verifyToken, todoController.createTodo);
router.get('/', verifyToken, todoController.getTodo);
router.delete('/:todoId/complete', verifyToken, todoController.deleteTodo);

module.exports = router;
