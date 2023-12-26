const express = require('express');
const routes = express.Router();

const controller = require('../controllers/person.controller');

routes.post('/person', controller.registerPerson);

module.exports = routes;