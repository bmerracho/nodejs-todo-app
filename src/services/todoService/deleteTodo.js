const Todo = require('../../models/modelTodo');
const { idSchema } = require('../../libraries/libValidate'); 

async function deleteTodo(req, res) {
    try {
		const { id } = req.params;
		await idSchema.validateAsync({ id });

		await Todo.findByIdAndDelete(id);

		res.status(200).json({ message: 'Todo deleted' });
	} catch (error) {
		let status = 500;
        if (error.isJoi === true) status = 422;
		return res.status(500).json({
			error
		});
	}
}

module.exports = deleteTodo