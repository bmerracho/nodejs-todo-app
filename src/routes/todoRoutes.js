const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

/**
 * CREATE a new todo
 */
router.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });

  await todo.save();
  res.json(todo);
});

/**
 * READ single todo by id
 */
router.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  res.json(todo);
});

/**
 * READ multiple todos
 * (optional) include limit and page
 */
router.get('/todos', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const todos = await Todo.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Todo.countDocuments();

  res.json({
    todos,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page, 10),
  });
});

/**
 * UPDATE todo by id
 */
router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    { completed },
    { new: true }
  );

  res.json(todo);
});

/**
 * DELETE todo by id
 */
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.json({ message: 'Todo deleted' });
});

module.exports = router;
