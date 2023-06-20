const Todo = require('../../models/modelTodo');
const { updateTodoSchema } = require('../../libraries/libValidate'); 

async function updateTodo(req, res) {
    try {
		const { id } = req.params;
		const { title, description, completed } = req.body;
		await updateTodoSchema.validateAsync({id, title, description, completed})

		const todo = await Todo.findByIdAndUpdate(
			id,
			{ title, description, completed },
			{ new: true }
		);

		res.status(200).json(todo);
	} catch (error) {
		let status = 500;
        if (error.isJoi === true) status = 422;
		return res.status(500).json({
			error
		})
	}
}

module.exports = updateTodo;