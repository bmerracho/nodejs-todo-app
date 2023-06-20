const Todo = require('../../models/Todo');

async function deleteTodo(req, res) {
    try {
		const { id } = req.params;

		await Todo.findByIdAndDelete(id);

		res.status(200).json({ message: 'Todo deleted' });
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
}

module.exports = deleteTodo