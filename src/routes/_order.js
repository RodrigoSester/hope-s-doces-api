const express = require('express');
const routes = express.Router();

const authorizer = require('../middlewares/authorizer.middleware');

const controller = require('../controllers/order.controller');

routes.post('/orders', authorizer.verify, controller.registerOrder);

module.exports = routes;
