const express = require('express');
const app = express();

app.use(require('cookie-parser')());
app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
