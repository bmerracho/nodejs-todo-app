const express = require('express');
const app = express();
require('dotenv').config()
const todoRouter = require('./routes/todoRouter');


const { connectDB } = require('./db');
connectDB();

app.use(express.json());
app.use('/api', todoRouter);

const PORT = 3000;
const server = app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}...`)
);

module.exports = { app, server };