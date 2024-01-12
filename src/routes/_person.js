const express = require('express');
const routes = express.Router();

const authorizer = require('../middlewares/authorizer.middleware');

const controller = require('../controllers/person.controller');

routes.post('/person', authorizer.verify, controller.registerPerson);

module.exports = routes;