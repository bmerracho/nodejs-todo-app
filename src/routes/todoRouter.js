const express = require('express');
const todoService = require('../services/todoService');
const todoRouter = express.Router();
/**
 * CREATE a new todo
 */
todoRouter.post('/todos', (req, res) => {
	return todoService.createTodo(req, res);
});

/**
 * READ single todo by id
 */
todoRouter.get('/todos/:id', (req, res) => {
	return todoService.readTodoById(req, res);
});

/**
 * READ multiple todos
 * limit = 10 per page
 * (optional) include limit and page
 */
todoRouter.get('/todos', (req, res) => {
	return todoService.readTodoList(req, res);
});

/**
 * UPDATE todo by id
 */
todoRouter.put('/todos/:id', (req, res) => {
	return todoService.updateTodo(req, res);
});

/**
 * DELETE todo by id
 */
todoRouter.delete('/todos/:id', (req, res) => {
	return todoService.deleteTodo(req, res);
});

module.exports = todoRouter;
