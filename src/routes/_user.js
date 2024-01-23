const express = require('express');
const routes = express.Router();

const controller = require('../controllers/user.controller');

routes.post('/users', controller.register);
routes.post('/users/login', controller.login);

module.exports = routes;
