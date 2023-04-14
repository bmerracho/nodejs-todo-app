const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();
/**
 * CREATE a new todo
 */
router.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
    });
  
    await todo.save();
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({error});
  }
});

/**
 * READ single todo by id
 */
router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({error});
  }
});

/**
 * READ multiple todos
 * limit = 10 per page
 * (optional) include limit and page
 */
router.get('/todos', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const todos = await Todo.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Todo.countDocuments();

    res.status(200).json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    }); 
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
});

/**
 * UPDATE todo by id
 */
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
});

/**
 * DELETE todo by id
 */
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
});

module.exports = router;
