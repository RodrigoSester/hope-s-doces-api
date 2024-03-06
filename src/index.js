const express = require('express');

const app = express();
const cors = require('cors');

const orderRoutes = require('./routes/_order');
const userRoutes = require('./routes/_user');
const personRoutes = require('./routes/_person');
const recipeRoutes = require('./routes/_recipe');

app.use(express.json());

app.use(cors());

app.use(userRoutes);
app.use(personRoutes);
app.use(recipeRoutes);
app.use(orderRoutes);

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 3333
}).then(() => {
  console.log('Server running');
});

module.exports = app;
