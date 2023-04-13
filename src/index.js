const express = require('express');
const app = express();
const port = 3000;
const todoRoutes = require('./routes/todoRoutes');

require('./db');

app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost`);
});
