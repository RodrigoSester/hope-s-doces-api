const express = require('express');
const serverless = require('serverless-http');

const app = express();
const cors = require('cors');

const orderRoutes = require('./routes/_order');
const userRoutes = require('./routes/_user');
const personRoutes = require('./routes/_person');
const recipeRoutes = require('./routes/_recipe');

app.use(express.json());

app.use(cors());

app.use('/.netlify/functions/app/user', userRoutes);
app.use('/.netlify/functions/app/person', personRoutes);
app.use('/.netlify/functions/app/recipe', recipeRoutes);
app.use('/.netlify/functions/app/order', orderRoutes);

module.exports = app;
module.exports.handler = serverless(app);
