const Todo = require('../../models/Todo');

async function updateTodo(req, res) {
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
}

module.exports = updateTodo;