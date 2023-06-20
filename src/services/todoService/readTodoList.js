const Todo = require('../../models/Todo');

async function readTodoList(req, res) {
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
}

module.exports = readTodoList;
