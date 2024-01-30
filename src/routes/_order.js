const express = require('express');
const routes = express.Router();

const authorizer = require('../middlewares/authorizer.middleware');

const controller = require('../controllers/order.controller');
const queryOptions = require('../middlewares/query-options.middleware');

routes.post('/orders', authorizer.verify, controller.registerOrder);
routes.get('/orders', authorizer.verify, queryOptions.apply, controller.getAllOrders);
routes.get('/orders/:id', authorizer.verify, controller.getOrderById);

module.exports = routes;
