const express = require('express');
const app = express();
require('dotenv').config()
const todoRoutes = require('./routes/todoRoutes');
const port = process.env.PORT;
const host = process.env.HOST;

require('./db');

app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, host, () => {
  console.log(`App listening at ${host}:${port}`);
});
