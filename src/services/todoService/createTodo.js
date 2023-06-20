const Todo = require('../../models/modelTodo');
const { createTodoSchema } = require('../../libraries/libValidate'); 

async function createTodo(req, res) {
    try {
        await createTodoSchema.validateAsync(req.body);
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
        });

        await todo.save();
        return res.json(todo);
    } catch (error) {
        let status = 500;
        if (error.isJoi === true) status = 422;
        return res.status(status).json({ error });
    }
}

module.exports = createTodo;