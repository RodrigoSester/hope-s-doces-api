const express = require('express');
const app = express();

const routes = require('./src/routes');

app.use(express.json());

routes.configureRoutes(app);

app.listen(3000);

module.exports = app;
