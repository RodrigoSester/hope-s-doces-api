const express = require('express');
const serverless = require('serverless-http');
const app = express();

const routes = require('./routes');

app.use(express.json());

app.use('/.netlify/functions/api', routes);

routes.configureRoutes(app);

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports.handler = serverless(app);
