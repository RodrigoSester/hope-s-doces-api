const express = require('express');
const routes = express.Router();

// middlewares
const authorizer = require('../middlewares/authorizer.middleware');
const queryOptions = require('../middlewares/query-options.middleware');

const controller = require('../controllers/person.controller');

routes.post('/person', authorizer.verify, controller.registerPerson);
routes.get('/person/:id', authorizer.verify, controller.getById);
routes.get('/person', authorizer.verify, queryOptions.apply, controller.getAll);
routes.delete('/person/:personId', authorizer.verify, controller.remove);

module.exports = routes;
