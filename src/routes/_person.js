const express = require('express');
const routes = express.Router();

const authorizer = require('../middlewares/authorizer.middleware');

const controller = require('../controllers/person.controller');

routes.post('/person', authorizer.verify, controller.registerPerson);
routes.get('/person/:id', authorizer.verify, controller.getById);
routes.get('/person', authorizer.verify, controller.getAll);

module.exports = routes;