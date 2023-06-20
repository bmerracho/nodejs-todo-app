const supertest = require('supertest');
const { app, server } = require('./app');
const request = supertest(app);

const { connectDB, closeDB } = require('./db');

describe('API test', () => {
	beforeAll(() => {
		connectDB();
	});

	afterAll(() => {
		closeDB();
		server.close();
	});

	describe('POST /api/todos', () => {
		it('test if it can create todo', async () => {
			const res = await request
				.post('/api/todos')
				.send({
					title: 'test todo',
					description: 'a todo test'
				});

			expect(res.status).toBe(200);
		});
	});

	describe('GET /api/todos', () => {
		it('test if retrieve all todos', async () => {
			const res = await request.get('/api/todos');
			expect(res.status).toBe(200);
		});

		it('test to get pagination', async () => {
			const res = await request.get('/api/todos?limit=1&page=1');
			expect(res.status).toBe(200);
		});

		it('test to get todo by id', async () => {
			const res = await request.get('/api/todos?limit=1&page=1');
			const todoId = res.body.todos[0]._id;
			const resById = await request.get(`/api/todos/${todoId}`);
			expect(resById.status).toBe(200);
		});
	});

	describe('PUT /api/todos', () => {
		it('test to modify todo status', async () => {
			const res = await request.get('/api/todos?limit=1&page=1');
			const todoId = res.body.todos[0]._id;
			const resModify = await request
				.put(`/api/todos/${todoId}`)
				.send({
					completed: true
				});
			expect(resModify.body.completed).toEqual(true);
		});
	});

	describe('DELETE /api/todos', () => {
		it('test to delete a todo', async () => {
			const res = await request.get('/api/todos?limit=1&page=1');
			const todoId = res.body.todos[0]._id;
			const resDelete = await request.delete(`/api/todos/${todoId}`);
			expect(resDelete.status).toBe(200);
		});
	});

});