const Todo = require('../../models/Todo');

async function readTodoById(req, res) {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (todo === null) {
            return res.status(200).json({
                'message': 'todo does not exist'
            });
        }
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = readTodoById;