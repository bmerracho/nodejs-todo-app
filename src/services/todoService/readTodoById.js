const Todo = require('../../models/modelTodo');
const { idSchema } = require('../../libraries/libValidate'); 

async function readTodoById(req, res) {
    try {
        const { id } = req.params;
        await idSchema.validateAsync({ id });
        const todo = await Todo.findById(id);

        if (todo === null) {
            return res.status(200).json({
                'message': 'todo does not exist'
            });
        }
        return res.status(200).json(todo);
    } catch (error) {
        let status = 500;
        if (error.isJoi === true) status = 422;
        return res.status(500).json({ error });
    }
}

module.exports = readTodoById;