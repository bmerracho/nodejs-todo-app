const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

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
    currentPage: page,
  });
});

router.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });

  await todo.save();
  res.json(todo);
});

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

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.json({ message: 'Todo deleted' });
});

module.exports = router;
