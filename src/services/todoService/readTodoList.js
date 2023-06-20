const Todo = require('../../models/modelTodo');
const { pageSchema } = require('../../libraries/libValidate'); 

async function readTodoList(req, res) {
    try {
		const { page = 1, limit = 10 } = req.query;
		await pageSchema.validateAsync({ page, limit });

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
		let status = 500;
        if (error.isJoi === true) status = 422;
		return res.status(500).json({
			error
		})
	}
}

module.exports = readTodoList;
